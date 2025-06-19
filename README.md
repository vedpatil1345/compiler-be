# Online Compiler

## Description

This project is a versatile online compiler that allows users to compile and run code in different programming languages directly in their web browser. It provides a convenient and user-friendly environment for writing, compiling, and executing code, making it accessible to both beginners and experienced developers.

The online compiler supports multiple programming languages, including JavaScript, Python, Java, C, and C++. It features a Monaco Editor for code editing with syntax highlighting and autocompletion, real-time code execution and output display, customizable terminal height, a file explorer for managing different code files, and the ability to clear the terminal output.

## Features

-   **Multiple Programming Languages Support:** The compiler supports a wide range of programming languages, including JavaScript, Python, Java, C, and C++. This allows users to experiment with different languages and execute code in their preferred language. Each language has its own dedicated file which can be selected in the file explorer.

-   **Monaco Editor Integration:** The Monaco Editor provides a rich code editing experience with features like syntax highlighting, autocompletion, and code suggestions. This makes it easier for users to write and edit code, reducing errors and improving productivity. The editor also supports multiple themes and keyboard shortcuts, allowing users to customize the editor to their liking.

-   **Real-time Code Execution and Output Display:** The compiler executes code in real-time and displays the output in a terminal below the editor. This allows users to quickly test and debug their code, making it easier to identify and fix errors. The terminal also supports basic commands like `clear` and `history`.

-   **Customizable Terminal Height:** Users can adjust the terminal height by dragging the divider between the editor and the terminal. This allows them to customize the layout of the app to suit their needs. The terminal height is saved in the user's browser, so it will be restored when they return to the app.

-   **File Explorer for Code Management:** The file explorer allows users to manage different code files, making it easier to organize and access their code. Users can create new files, delete files, and rename files.

-   **Clear Terminal Output:** Users can clear the terminal output by clicking the "Clear" button in the terminal. This helps to keep the terminal clean and organized.

## How to Use

1.  **Select a Programming Language:** Choose a programming language from the file explorer to start writing code in that language. The file explorer displays a list of available programming languages, along with a brief description of each language.

2.  **Write Your Code:** Use the Monaco Editor to write your code. The editor provides syntax highlighting, autocompletion, and code suggestions to help you write code more efficiently. You can also use the editor to format your code, indent your code, and comment out code.

3.  **Run Your Code:** Click the "Run Code" button to execute your code. The compiler will execute your code and display the output in the terminal below the editor. The "Run Code" button is located in the top right corner of the editor.

4.  **View the Output:** View the output of your code in the terminal below the editor. The terminal displays the output in real-time, allowing you to quickly test and debug your code. The terminal also displays any errors that occur during code execution.

5.  **Adjust Terminal Height:** Adjust the terminal height by dragging the divider between the editor and the terminal. This allows you to customize the layout of the app to suit your needs.

6.  **Clear Terminal Output:** Clear the terminal output by clicking the "Clear" button in the terminal. This helps to keep the terminal clean and organized. The "Clear" button is located in the top right corner of the terminal.

## Architecture

The online compiler consists of two main parts: the frontend and the backend. The frontend is responsible for providing the user interface and handling user input. The backend is responsible for compiling and executing the code.

The frontend is built using React, Redux, and Tailwind CSS. The backend is built using Node.js, Express, and Docker.

## Technologies Used

-   Frontend: React, Redux, Tailwind CSS, Monaco Editor
-   Backend: Node.js, Express, Docker

## License

This project is licensed under the MIT License.
