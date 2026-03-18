// Basit Hesap Makinesi - JavaScript

let currentInput = '0';
let shouldResetDisplay = false;

const displayElement = document.getElementById('display-screen');

function updateDisplay() {
    displayElement.textContent = currentInput || '0';
    // Scroll to the end of the display
    displayElement.scrollLeft = displayElement.scrollWidth;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points in the same number
    if (num === '.') {
        const parts = currentInput.split(/[+\-*/%]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return;
        }
    }
    
    // Prevent leading zeros
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') {
        currentInput = '0';
    }
    
    // Replace last operator if one exists
    const lastChar = currentInput.slice(-1);
    if ('+-*/%'.includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
    }
    
    shouldResetDisplay = false;
    currentInput += op;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    if (currentInput === '' || currentInput === '0') return;
    
    try {
        // Replace display operators with JavaScript operators
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Prevent evaluation ending with operator
        const lastChar = expression.slice(-1);
        if ('+-*/%'.includes(lastChar)) {
            expression = expression.slice(0, -1);
        }
        
        // Safely evaluate the expression
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Handle division by zero or invalid results
        if (!isFinite(result)) {
            currentInput = 'Hata';
        } else {
            // Format result: limit decimals and remove trailing zeros
            currentInput = String(parseFloat(result.toFixed(8)));
        }
        
        shouldResetDisplay = true;
    } catch {
        currentInput = 'Hata';
        shouldResetDisplay = true;
    }
    
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        appendNumber(e.key);
    } else if (e.key === '.') {
        e.preventDefault();
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        clearDisplay();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === '%') {
        e.preventDefault();
        appendOperator('%');
    }
});
