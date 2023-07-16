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
        if (display.textContent === '-0') {
            if (e.target.firstChild.textContent === '0') {
                display.textContent = '-0';
            } else {
                display.textContent = -e.target.firstChild.textContent;
                preventOperator = false;
            }
        } else if (display.textContent.length < 11) {
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
            z = operators[e.target.classList[1]];
        } else if (x !== null && y === null && preventOperator === false) {
            y = +display.textContent;
            x = parseFloat(operate(x, y, z).toPrecision(10));
            if (x === Infinity || isNaN(x) === true) {
                x = 'ERROR';
            }
            display.textContent = x;
            x = +x;
            y = null;
            z = operators[e.target.classList[1]];
        } else {
            z = operators[e.target.classList[1]];
        }
        clearDOM = true;
        preventOperator = true;
        clearButtonColor();
        button.style.backgroundColor = 'orange';
    });
});

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => {
    if (x !== null && y === null && preventOperator === false) {
        y = +display.textContent;
        x = parseFloat(operate(x, y, z).toPrecision(10));
        if (x === Infinity || isNaN(x) === true) {
            x = 'ERROR';
        }
        display.textContent = x;
        x = null;
        y = null;
        z = null;
        clearDOM = true;
        clearButtonColor();
    }
});

const allClearButton = document.querySelector('.all-clear');
allClearButton.addEventListener('click', () => {
    x = null;
    y = null;
    z = null;
    clearDOM = false;
    preventOperator = false;
    display.textContent = '0';
    clearButtonColor();
});

const changeSignButton = document.querySelector('.change-sign');
changeSignButton.addEventListener('click', () => {
    if (display.textContent !== 'ERROR' && preventOperator === false) {
        let displayArray = display.textContent.split('');
        if (displayArray[0] === '-') {
            displayArray.shift();
        } else if (displayArray[0] !== '-') {
            displayArray.unshift('-');
        }
        let changeSignDisplay = displayArray.join('');
        display.textContent = changeSignDisplay;
    }
});

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
    if (clearDOM === true) {
        display.textContent = '0.';
        clearDOM = false;
    }
});

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
    if (clearDOM === false) {
        let displayArray = display.textContent.split('');
        displayArray.pop();
        let deleteDisplay = displayArray.join('');
        if (deleteDisplay === '') {
            display.textContent = '0';
        } else {
            display.textContent = deleteDisplay;
        }
    }
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.borderColor = 'orange';
    });
    button.addEventListener('mouseleave', () => {
        button.style.borderColor = '';
    });
})

let operators = {
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

// Keyboard Support

document.addEventListener('keydown', (e) => {
    if (e.code.includes('Digit') === true) {
        if (clearDOM === true) {
            display.textContent = '';
            clearDOM = false;
        }
        if (display.textContent === '0') {
            display.textContent = '';
        }
        if (display.textContent === '-0') {
            if (e.key === '0') {
                display.textContent = '-0';
            } else {
                display.textContent = -e.key;
                preventOperator = false;
            }
        } else if (display.textContent.length < 11) {
            display.textContent += e.key;
            preventOperator = false;
        }
    }
});

let operandButtons = {
    '+': operators['add'],
    '-': operators['subtract'],
    'x': operators['multiply'],
    '/': operators['divide'],
};