let x = null;
let y = null;
let z = null;
let clearDOM = false;

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        display.textContent += e.target.firstChild.textContent;
    });
});

const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
    z = add;
});

function equal(x, y, z) {
    return z(x, y);
}

function add(x, y) {
    return x + y;
}