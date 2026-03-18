// Basit Hesap Makinesi - JavaScript

let currentInput = '';
let shouldResetDisplay = false;

const resultDisplay = document.getElementById('result');

function updateDisplay() {
    resultDisplay.value = currentInput || '';
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Prevent leading zeros
    if (num === '0' && currentInput === '0') {
        return;
    }
    
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    // Replace last operator if one exists
    const lastChar = currentInput.slice(-1);
    if ('+-*/'.includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
    }
    
    shouldResetDisplay = false;
    currentInput += op;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (currentInput === '') return;
    
    try {
        // Replace display operators with JavaScript operators
        let expression = currentInput.replace(/×/g, '*');
        
        // Prevent evaluation ending with operator
        const lastChar = expression.slice(-1);
        if ('+-*/'.includes(lastChar)) {
            expression = expression.slice(0, -1);
        }
        
        // Safely evaluate the expression
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Handle division by zero or invalid results
        if (!isFinite(result)) {
            currentInput = 'Hata';
        } else {
            currentInput = String(result);
        }
        
        shouldResetDisplay = true;
    } catch (error) {
        currentInput = 'Hata';
        shouldResetDisplay = true;
    }
    
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        deleteLast();
    }
});
