const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastCharacter() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = display.value.replace(/%/g, '/100');
        const result = Function(`return ${expression}`)();

        if (result === Infinity || Number.isNaN(result)) {
            display.value = 'Error';
            return;
        }

        display.value = result;
    } catch {
        display.value = 'Error';
    }
}

function handleInput(value) {
    switch (value) {
        case 'C':
            clearDisplay();
            break;
        case 'DEL':
            deleteLastCharacter();
            break;
        case '=':
            calculateResult();
            break;
        default:
            appendToDisplay(value);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.dataset.value);
    });
});

document.addEventListener('keydown', event => {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLastCharacter();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});