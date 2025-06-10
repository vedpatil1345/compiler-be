const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const serverless = require('serverless-http'); // ✅ For Vercel

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/compile', async (req, res) => {
  const { code, language } = req.body;

  let pistonLanguage, pistonVersion, fileName = 'main';

  switch (language.toLowerCase()) {
    case 'javascript':
      pistonLanguage = 'javascript'; pistonVersion = '18.15.0'; fileName += '.js'; break;
    case 'python':
      pistonLanguage = 'python'; pistonVersion = '3.10.0'; fileName += '.py'; break;
    case 'java':
      pistonLanguage = 'java'; pistonVersion = '15.0.2'; fileName += '.java'; break;
    case 'c':
      pistonLanguage = 'c'; pistonVersion = '10.2.0'; fileName += '.c'; break;
    case 'cpp':
      pistonLanguage = 'cpp'; pistonVersion = '10.2.0'; fileName += '.cpp'; break;
    default:
      return res.status(400).json({ error: `Unsupported language: ${language}. Supported: JavaScript, Python, Java, C, C++.` });
  }

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: pistonLanguage,
        version: pistonVersion,
        files: [{ name: fileName, content: code }]
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return res.status(response.status).json({ error: errorBody.message || 'Error from external compilation service' });
    }

    const data = await response.json();
    const stdout = data.run.stdout || '';
    const stderr = data.run.stderr || '';

    if (stderr) {
      return res.status(400).json({ error: stderr.trim() });
    } else {
      res.json({ message: stdout.trim() });
    }
  } catch (error) {
    console.error('Server encountered an error:', error);
    res.status(500).json({ error: 'Failed to process code. Please try again later.' });
  }
});

// ✅ Export the serverless handler
module.exports = serverless(app);
