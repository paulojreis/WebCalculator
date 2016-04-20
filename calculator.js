(function() {
    'use strict';

    // Calculator-related variables.
    var xReg = 0,
        yReg = null,
        flagReg = null,
        displayVal = xReg.toString();

    // DOM-related variables.
    var inputAreaEl = document.querySelector('.Calculator_inputArea'),
        displayEl = document.querySelector('.Calculator_display');

    inputAreaEl.addEventListener('click', handleButtonPress);
    inputAreaEl.addEventListener('touchend', handleButtonPress);
    document.addEventListener('keypress', handleKeyPress);

    renderDisplay();

    function handleButtonPress(e) {
        if (e.target.nodeName.toLowerCase() === 'button') {
            handleInput(e.target.value);
        }
    }

    function handleKeyPress(e) {
        var keyCode = e.keyCode || e.which,
            keyInputVal = String.fromCharCode(keyCode);

        if (keyCode === 13) { // Enter
            keyInputVal = '=';
        }
        handleInput(keyInputVal);
        simulateButtonPress(keyInputVal);
    }

    function handleInput(inputVal) {
        if (isNumericInput(inputVal)) {
            doNumberInput(inputVal);
        } else if (isOperationInput(inputVal)) {
            doOperationInput(inputVal);
        }
    }

    function doOperationInput(inputStr) {
        if (inputStr === 'c') {
            doClear();
            return;
        } else if (flagReg !== null && yReg !== null) {
            doCalculation();
        }

        flagReg = inputStr;
    }

    function doNumberInput(inputStr) {
        if (flagReg !== null && yReg === null) {
            yReg = xReg;
            xReg = 0;
            displayVal = xReg.toString();
        }

        if (displayVal === '0') {
            displayVal = (inputStr === '.' ? '0.' : inputStr);
        } else {
            if (inputStr !== '.' || !(inputStr === '.' && !Number.isInteger(xReg))) {
                displayVal += inputStr;
            }
        }

        xReg = Number.parseFloat(displayVal);

        renderDisplay();
    }

    function doCalculation() {
        switch (flagReg) {
            case '+':
                xReg = yReg + xReg;
                break;
            case '-':
                xReg = yReg - xReg;
                break;
            case '*':
                xReg = yReg * xReg;
                break;
            case '/':
                xReg = yReg / xReg;
                break;
            case 'e':
                xReg = Math.pow(yReg, xReg);
                break;
        }

        flagReg = null;
        yReg = null;
        displayVal = xReg.toString();

        renderDisplay();
    }

    function doClear() {
        xReg = 0;
        yReg = null;
        flagReg = null;
        displayVal = xReg.toString();

        renderDisplay();
    }

    function renderDisplay() {
        displayEl.textContent = displayVal;
    }

    function isNumericInput(inputStr) {
        return /^[0-9.]$/.test(inputStr);
    }

    function isOperationInput(inputStr) {
        return /^[+\-*/ec=]$/.test(inputStr);
    }

    function simulateButtonPress(keyVal) {
        var targetEl = document.querySelector('[value="' + keyVal + '"]');

        if (targetEl) {
            targetEl.classList.add('Calculator_button-active');

            window.setTimeout(function() {
                targetEl.classList.remove('Calculator_button-active');
            }, 100);
        }
    }
})();