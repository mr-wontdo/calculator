let x = null;
let y = null;
let z = null;
let clearDOM = false;

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
        if (display.textContent.length < 20) {
            display.textContent += e.target.firstChild.textContent;
        }
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
    }
});

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