document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '0';
    let operator = null;
    let operand1 = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                resetCalculator();
            } else if (value === '=') {
                if (operator && operand1 !== null) {
                    currentInput = calculate(operand1, operator, parseFloat(currentInput));
                    display.innerText = currentInput;
                    operator = null;
                    operand1 = null;
                    shouldResetDisplay = true;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '' && !shouldResetDisplay) {
                    if (operator && operand1 !== null) {
                        operand1 = calculate(operand1, operator, parseFloat(currentInput));
                        display.innerText = operand1;
                    } else {
                        operand1 = parseFloat(currentInput);
                    }
                    operator = value;
                    shouldResetDisplay = true;
                } else if (shouldResetDisplay) {
                    operator = value;
                }
            } else {
                if (shouldResetDisplay) {
                    currentInput = value === '.' ? '0.' : value;
                    shouldResetDisplay = false;
                } else {
                    currentInput = (currentInput === '0' && value !== '.') ? value : currentInput + value;
                }
                display.innerText = currentInput;
            }
        });
    });

    function resetCalculator() {
        currentInput = '0';
        operator = null;
        operand1 = null;
        shouldResetDisplay = false;
        display.innerText = '0';
    }

    function calculate(operand1, operator, operand2) {
        switch (operator) {
            case '+':
                return (operand1 + operand2).toString();
            case '-':
                return (operand1 - operand2).toString();
            case '*':
                return (operand1 * operand2).toString();
            case '/':
                return (operand1 / operand2).toString();
            default:
                return operand2.toString();
        }
    }
});