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
        display.textContent += e.target.firstChild.textContent;
    });
});

const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
    if (x === null && y === null) {
        x = +display.textContent;
        z = add;
        clearDOM = true;
    } else if (x !== null && y === null) {
        y = +display.textContent;
        z = add;
        x = z(x, y);
        y = null;
        z = null;
        display.textContent = x;
        clearDOM = true;
    }
});

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => {
    y = +display.textContent;
    x = z(x, y)
    display.textContent = x;
    y = null;
    z = null;
    clearDOM = true;
});

function equal(x, y, z) {
    return z(x, y);
}

function add(x, y) {
    return x + y;
}