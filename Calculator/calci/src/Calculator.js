import React, { useState } from 'react';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const clearDisplay = () => {
        setDisplayValue('0');
    };

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplayValue(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
        }
    };

    const inputDot = () => {
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForOperand)  {
            setOperator(nextOperator);
            return;
        }

        if (operator) {
            let result;
            switch (operator) {
                case '+':
                    result = parseFloat(inputValue) + parseFloat(displayValue);
                    break;
                case '-':
                    result = parseFloat(inputValue) - parseFloat(displayValue);
                    break;
                case '*':
                    result = parseFloat(inputValue) * parseFloat(displayValue);
                    break;
                case '/':
                    result = parseFloat(inputValue) / parseFloat(displayValue);
                    break;
                default:
                    return;
            }
            setDisplayValue(String(result));
        }
        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    return (
        <div className="calculator">
            <div className="display">{displayValue}</div>

            <div className="buttons">
                <button onClick={clearDisplay}>AC</button>
                <button onClick={() => performOperation('/')}>/</button>
                <button onClick={() => performOperation('*')}>*</button>
                <button onClick={() => inputDigit(7)}>7</button>
                <button onClick={() => inputDigit(8)}>8</button>
                <button onClick={() => inputDigit(9)}>9</button>
                <button onClick={() => performOperation('-')}>-</button>
                <button onClick={() => inputDigit(4)}>4</button>
                <button onClick={() => inputDigit(5)}>5</button>
                <button onClick={() => inputDigit(6)}>6</button>
                <button onClick={() => performOperation('+')}>+</button>
                <button onClick={() => inputDigit(1)}>1</button>
                <button onClick={() => inputDigit(2)}>2</button>
                <button onClick={() => inputDigit(3)}>3</button>
                <button onClick={() => inputDot()}>.</button>
                <button onClick={() => inputDigit(0)}>0</button>
                <button onClick={() => performOperation('=')}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
