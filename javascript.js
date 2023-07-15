let x = null;
let y = null;
let z = null;
let clearDOM = false;
let preventOperator = false;

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (clearDOM === true) {
            display.textContent = '';
            clearDOM = false;
        }
        if (display.textContent === '0') {
            display.textContent = '';
        }
        if (display.textContent.length < 11) {
            display.textContent += e.target.firstChild.textContent;
            preventOperator = false;
        }
    });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (x === null && y === null && preventOperator === false) {
            x = +display.textContent;
            z = functions[e.target.classList[1]];
        } else if (x !== null && y === null && preventOperator === false) {
            y = +display.textContent;
            z = functions[e.target.classList[1]];
            x = operate(x, y, z);
            y = null;
            display.textContent = x;
        } else {
            z = functions[e.target.classList[1]];
        }
        clearDOM = true;
        preventOperator = true;
        clearButtonColor();
        button.style.backgroundColor = 'orange';
    });
});

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => {
    if (x !== null && y === null) {
        y = +display.textContent;
        display.textContent = operate(x, y, z);
        x = null;
        y = null;
        z = null;
        clearDOM = true;
        clearButtonColor();
    }
});

let functions = {
    'add': add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide
};

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, y, z) {
    return z(x, y);
}

function clearButtonColor() {
    operatorButtons.forEach(button => {
        button.style.backgroundColor = 'whitesmoke';
    });
}