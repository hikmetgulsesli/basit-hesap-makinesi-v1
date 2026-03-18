// Basit Hesap Makinesi - JavaScript

let display = document.getElementById('result');

function appendToDisplay(value) {
    if (display.value === '0' || display.value === 'Error') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        // Güvenli eval - sadece sayılar ve operatörlere izin ver
        expression = expression.replace(/[^0-9+\-*/.]/g, '');
        if (expression) {
            let result = Function('"use strict"; return (' + expression + ')')();
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Klavye desteği
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9\+\-\*\/\.]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});