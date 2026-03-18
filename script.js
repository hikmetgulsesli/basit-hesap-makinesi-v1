// Basit Hesap Makinesi - JavaScript

class Calculator {
  constructor() {
    this.displayCurrent = document.getElementById('display-current');
    this.displayPrevious = document.getElementById('display-previous');
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;

    this.init();
  }

  init() {
    // Add button listeners
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (action === 'number') {
          this.appendNumber(value);
        } else if (action === 'decimal') {
          this.appendDecimal();
        } else if (action === 'operator') {
          this.chooseOperator(value);
        } else if (action === 'calculate') {
          this.calculate();
        } else if (action === 'clear') {
          this.clear();
        } else if (action === 'backspace') {
          this.backspace();
        }
      });
    });

    // Add keyboard support
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  handleKeyboard(e) {
    if (e.key >= '0' && e.key <= '9') {
      this.appendNumber(e.key);
    } else if (e.key === '.') {
      this.appendDecimal();
    } else if (e.key === '+' || e.key === '-') {
      this.chooseOperator(e.key);
    } else if (e.key === '*') {
      this.chooseOperator('×');
    } else if (e.key === '/') {
      e.preventDefault();
      this.chooseOperator('÷');
    } else if (e.key === '%') {
      this.chooseOperator('%');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      this.calculate();
    } else if (e.key === 'Escape') {
      this.clear();
    } else if (e.key === 'Backspace') {
      this.backspace();
    }
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }
    
    if (number === '0' && this.currentOperand === '0') return;
    if (this.currentOperand === '0' && number !== '0') {
      this.currentOperand = number;
    } else {
      // Limit digits
      if (this.currentOperand.length >= 15) return;
      this.currentOperand += number;
    }
    this.updateDisplay();
  }

  appendDecimal() {
    if (this.shouldResetScreen) {
      this.currentOperand = '0';
      this.shouldResetScreen = false;
    }
    if (this.currentOperand.includes('.')) return;
    this.currentOperand += '.';
    this.updateDisplay();
  }

  chooseOperator(operator) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    
    this.operation = operator;
    this.previousOperand = this.currentOperand;
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  calculate() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        if (current === 0) {
          this.showError('Hata');
          return;
        }
        computation = prev / current;
        break;
      case '%':
        computation = prev % current;
        break;
      default:
        return;
    }

    // Handle floating point precision
    if (!isFinite(computation)) {
      this.showError('Hata');
      return;
    }

    // Round to avoid floating point errors
    computation = Math.round(computation * 100000000) / 100000000;
    
    // Limit display length
    const computationStr = computation.toString();
    if (computationStr.length > 15) {
      computation = parseFloat(computation.toExponential(10));
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  showError(message) {
    this.currentOperand = message;
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
    this.updateDisplay();
  }

  backspace() {
    if (this.shouldResetScreen) return;
    if (this.currentOperand.length === 1 || 
        (this.currentOperand.length === 2 && this.currentOperand[0] === '-')) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    this.updateDisplay();
  }

  updateDisplay() {
    // Format current operand
    let displayValue = this.currentOperand;
    
    // If there's a previous operand and operation, show them
    if (this.previousOperand !== '' && this.operation !== undefined) {
      this.displayPrevious.textContent = `${this.formatNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.displayPrevious.textContent = '';
    }

    this.displayCurrent.textContent = this.formatNumber(displayValue);
  }

  formatNumber(number) {
    const stringNumber = number.toString();
    const integerPart = stringNumber.split('.')[0];
    const decimalPart = stringNumber.split('.')[1];
    
    let formatted;
    if (integerPart.includes('-')) {
      formatted = integerPart.replace('-', '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      formatted = '-' + formatted;
    } else {
      formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    if (decimalPart !== undefined) {
      formatted += '.' + decimalPart;
    }
    
    return formatted;
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});
