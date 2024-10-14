# JavaScript Calculator

A simple calculator built using **React** and **Vite**. This calculator supports basic arithmetic operations such as addition, subtraction, multiplication, and division, and handles both positive and negative numbers, as well as decimal values.

## Features
- **Basic Operations**: Perform addition, subtraction, multiplication, and division.
- **Negative Numbers**: Support for operations involving negative numbers.
- **Decimal Numbers**: You can perform operations on numbers containing decimal points.
- **Consecutive Operators**: If two or more operators are entered consecutively, the last operator (excluding the negative `-` sign) is considered.
- **Error Handling**: Warnings are displayed when the digit limit is exceeded.
- **Formula Display**: Shows the ongoing formula in real-time as you input values and operators.

## Tech Stack
- **Frontend**: React (using JSX)
- **Bundler**: Vite
- **Languages**: JavaScript (ES6+), HTML, CSS

## Installation and Setup
Follow the steps below to set up and run the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/calculator-app.git
   cd calculator-app
Install dependencies: Make sure you have Node.js installed. Run the following command to install all required dependencies:

bash
Copy code
npm install
Run the development server: After the installation, run the project using the Vite development server:

bash
Copy code
npm run dev
Open the app in your browser: Once the server is running, open your browser and go to:

arduino
Copy code
# http://localhost:3000
Usage
Click on the buttons to input numbers and perform arithmetic operations.
The result of the calculations is displayed in real-time.
Use the AC button to clear all inputs and reset the calculator.
How It Works
handleNumbers: Manages the input of numbers and updates the display accordingly.
handleOperators: Ensures the correct operator is used when multiple operators are entered consecutively, excluding the negative sign.
handleEvaluate: Computes the result when the = button is clicked and shows the final result.
handleDecimal: Manages decimal inputs, ensuring only one decimal point is used per number.
Max Digit Warning: Displays a warning if the input exceeds the maximum allowed digit length.