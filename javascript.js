let x = null;
let y = null;
let z = null;
let clearDisplay = false;
let preventOperator = false;

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        addNumbers(e, e.target.firstChild.textContent);
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
            x = operate(x, y, z);
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
        clearDisplay = true;
        preventOperator = true;
        clearButtonColor();
        button.style.backgroundColor = '#502C18';
    });
});

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => equal());

const allClearButton = document.querySelector('.all-clear');
allClearButton.addEventListener('click', () => {
    x = null;
    y = null;
    z = null;
    clearDisplay = false;
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
decimalButton.addEventListener('click', () => addDecimal());

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => deleteNumbers());

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.borderColor = 'whitesmoke';
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

function addNumbers(e, number) {
    if (clearDisplay === true) {
        display.textContent = '';
        clearDisplay = false;
    }
    if (display.textContent === '0') {
        display.textContent = '';
    }
    if (display.textContent === '-0') {
        if (e.target.firstChild.textContent === '0') {
            display.textContent = '-0';
        } else {
            display.textContent = -number;
            preventOperator = false;
        }
    } else if (display.textContent.length < 11) {
        display.textContent += number;
        preventOperator = false;
    }
}

function operate(x, y, z) {
    result = z(x, y);
    if (result > 0 && result < 1 && result.toString().length > 10) {
        return result.toPrecision(7);
    } else if (result.toString().length > 10) {
        return result.toExponential(6);
    } else {
        return result;
    }
}

function equal () {
    if (x !== null && y === null && preventOperator === false) {
        y = +display.textContent;
        x = operate(x, y, z);
        if (x === Infinity || isNaN(x) === true) {
            x = 'ERROR';
        }
        display.textContent = x;
        x = null;
        y = null;
        z = null;
        clearDisplay = true;
        clearButtonColor();
        equalButton.style.backgroundColor = '#502C18';
    }
}

function addDecimal () {
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
    if (clearDisplay === true) {
        display.textContent = '0.';
        clearDisplay = false;
    }
}

function deleteNumbers () {
    if (clearDisplay === false) {
        let displayArray = display.textContent.split('');
        displayArray.pop();
        let deleteDisplay = displayArray.join('');
        if (deleteDisplay === '') {
            display.textContent = '0';
        } else {
            display.textContent = deleteDisplay;
        }
    }
}

function clearButtonColor() {
    buttons.forEach(button => {
        button.style.backgroundColor = '#EADAB7';
    });
}

// Keyboard Support

document.addEventListener('keydown', (e) => {
    if (e.code.includes('Digit') === true && Number.isInteger(+e.key) === true) {
        addNumbers(e, e.key);
    }
    if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '*' || e.key === '/') {
        if (x === null && y === null && preventOperator === false) {
            x = +display.textContent;
            z = operandButtons[e.key];
        } else if (x !== null && y === null && preventOperator === false) {
            y = +display.textContent;
            x = operate(x, y, z);
            if (x === Infinity || isNaN(x) === true) {
                x = 'ERROR';
            }
            display.textContent = x;
            x = +x;
            y = null;
            z = operandButtons[e.key];
        } else {
            z = operandButtons[e.key];
        }
        clearDisplay = true;
        preventOperator = true;
        clearButtonColor();
    }
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        equal();
    }
    if (e.key === '.') {
        addDecimal();
    }
    if (e.key === 'Backspace') {
        deleteNumbers();
    }
});

let operandButtons = {
    '+': operators['add'],
    '-': operators['subtract'],
    'x': operators['multiply'],
    '*': operators['multiply'],
    '/': operators['divide'],
};