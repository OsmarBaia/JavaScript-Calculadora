class Calculator {
    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    checkLastDigit(input, upperValue, reg) {
        return (
            !reg.test(input) && !reg.test(upperValue.substring(upperValue.length - 1))
        );
    }

    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        let reg = new RegExp('^\\d+$');

        if (calc.checkLastDigit(input, upperValue, reg)) {
            return false;
        }

        if (upperValue === "0") {
            calc.upperValue.textContent = input;
        } else {
            calc.upperValue.textContent += input;
        }

    }
}

let calc = new Calculator();
let buttons = document.querySelectorAll('.btn');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', calc.btnPress);
}