// Import necessary modules
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Used for making HTTP requests to external APIs

// Initialize the Express application
const app = express();

// Use process.env.PORT for Vercel deployment. If not available (e.g., local development), default to 4000.
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes, allowing requests from different origins (e.g., a frontend application).
app.use(cors());

// Enable Express to parse JSON formatted request bodies.
app.use(express.json());

/**
 * @route POST /compile
 * @description Handles requests to compile and execute code.
 * @param {object} req - The request object, containing `code` and `language` in its body.
 * @param {object} res - The response object to send back execution results or errors.
 */
app.post('/compile', async (req, res) => {
  // Destructure `code` and `language` from the request body
  const { code, language } = req.body;

  let pistonLanguage; // Variable to hold the Piston API's language identifier
  let pistonVersion;  // Variable to hold the Piston API's language version
  let fileName = 'main'; // Default file name, will be updated with correct extension

  // Map the user-provided language name to Piston API's specific language identifiers and versions.
  // This also sets the appropriate file extension for compilation.
  switch (language.toLowerCase()) {
    case 'javascript':
      pistonLanguage = 'javascript'; // Piston uses 'javascript' for JavaScript execution
      pistonVersion = '18.15.0'; // Reverting to a specific, commonly supported Node.js LTS version on Piston
      fileName += '.js';
      break;
    case 'python':
      pistonLanguage = 'python';
      pistonVersion = '3.10.0'; // A stable, recent Python version
      fileName += '.py';
      break;
    case 'java':
      pistonLanguage = 'java';
      pistonVersion = '15.0.2'; // A stable, recent Java Development Kit (JDK) version
      fileName += '.java';
      break;
    case 'c':
      pistonLanguage = 'c';
      pistonVersion = '10.2.0'; // Specifying a precise GCC version for C
      fileName += '.c';
      break;
    case 'cpp':
      pistonLanguage = 'cpp'; // Piston uses 'cpp' for C++
      pistonVersion = '10.2.0'; // Specifying a precise G++ version for C++ (part of GCC 11.2.0)
      fileName += '.cpp';
      break;
    default:
      // If the language is not supported, send a 400 Bad Request response.
      return res.status(400).json({ error: `Unsupported language: ${language}. Supported languages are JavaScript, Python, Java, C, C++.` });
  }

  try {
    // Make a POST request to the Piston API's execute endpoint.
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST', // Use POST method to send code to the API
      headers: {
        'Content-Type': 'application/json', // Specify that the request body is JSON
      },
      // Construct the request body according to Piston API documentation.
      body: JSON.stringify({
        language: pistonLanguage,
        version: pistonVersion,
        files: [
          {
            // Piston expects an array of files. We'll send one file with the provided code.
            name: fileName, // Use the dynamically set file name with correct extension
            content: code, // The actual code provided by the user
          },
        ],
      }),
    });

    // Check if the HTTP response from Piston API was successful (status code 2xx).
    if (!response.ok) {
      const errorBody = await response.json(); // Parse the error response from Piston
      console.error('Error from Piston API:', errorBody);
      // Forward the error message from Piston to the client, or a generic error if none provided.
      return res.status(response.status).json({ error: errorBody.message || 'Error from external compilation service' });
    }

    // Parse the successful response from Piston API.
    const data = await response.json();

    // Piston API returns execution results in the `run` object, which contains `stdout` (standard output)
    // and `stderr` (standard error).
    const stdout = data.run.stdout || ''; // Get the standard output
    const stderr = data.run.stderr || ''; // Get the standard error

    // If there is anything in standard error, it indicates a compilation or runtime error in the code.
    if (stderr) {
      return res.status(400).json({ error: stderr.trim() }); // Send stderr as an error response
    } else {
      // Otherwise, the execution was successful, send the standard output.
      res.json({ message: stdout.trim() });
    }

  } catch (error) {
    // Catch any network errors or unexpected issues during the fetch operation.
    console.error('Server encountered an error:', error);
    res.status(500).json({ error: 'Failed to process code. Please check server logs or try again.' });
  }
});

// Start the Express server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
