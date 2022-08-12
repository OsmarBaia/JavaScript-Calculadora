class Calculator {
    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }

    checkLastDigit(input, upperValue, reg) {
        return (
            !reg.test(input) && !reg.test(upperValue.substring(upperValue.length - 1))
        );
    }

    sum(n1, n2) {
        return parseFloat(n1) + parseFloat(n2);
    }

    subtraction(n1, n2) {
        return parseFloat(n1) - parseFloat(n2);
    }

    multiplication(n1, n2) {
        return parseFloat(n1) - parseFloat(n2);
    }

    division(n1, n2) {
        return parseFloat(n1) / parseFloat(n2);
    }


    updateValues(total) {
        this.upperValue.textContent = total.toString();
        this.resultValue.textContent = total.toString();
    }


    resolution() {
        let upperValueArray = (this.upperValue.textContent).split(' ');
        let result = 0;
        for (let i = 0; i <= upperValueArray.length; i++) {
            let currentItem = upperValueArray[i];

            let n1 = upperValueArray[i - 1];
            let n2 = upperValueArray[i + 1];

            switch (currentItem) {
                case '+':
                    result = calc.sum(n1, n2);
                    break;
                case '-':
                    result = calc.subtraction(n1, n2);
                    break;
                case '/':
                    result = calc.division(n1, n2);
                    break;
                case 'x':
                    result = calc.multiplication(n1, n2);
                    break;
                default:
                    continue;
            }

            if (result) {
                calc.reset = 1;
            }

            calc.updateValues(result);

        }
    }

    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        let reg = new RegExp('^\\d+$');

        //Reset
        if (calc.reset && reg.test(input)) {
            upperValue = '0';
        }
        calc.reset = 0;

        if (input === 'AC') {
            calc.clearValues();
        } else if (input === '=') {
            calc.resolution();
        } else {
            if (calc.checkLastDigit(input, upperValue, reg)) {
                return false;
            }

            if (!reg.test(input)) {
                input = ` ${input} `;
            }


            if (upperValue === "0") {
                calc.upperValue.textContent = input;
            } else {
                calc.upperValue.textContent += input;
            }
        }

    }
}

let calc = new Calculator();
let buttons = document.querySelectorAll('.btn');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', calc.btnPress);
}