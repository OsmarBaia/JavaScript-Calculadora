class Calculator {
    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
        this.ClearButtonPressed();
    }

    ClearButtonPressed() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }

    CalcDisplayUpdate(total) {
        this.upperValue.textContent = total.toString();
        this.resultValue.textContent = total.toString();
    }

    FilterInput(input, upperValue, reg) {
        return (
            !reg.test(input) && !reg.test(upperValue.substring(upperValue.length - 1))
        );
    }

    FilterMathOperationOrder(symbol, array) {
        if (symbol !== "x" && symbol !== "/" && symbol !== "+" && symbol !== "-") {
            return -1;
        } else {
            if (symbol === "x") {
                return 0;
            } else if (array.includes("x")) {
                return -1;
            } else if (symbol === "/") {
                return 1;
            } else if (array.includes("/")) {
                return -1;
            } else if (symbol === "+") {
                return 2;
            } else if (array.includes("+")) {
                return -1;
            } else if (symbol === "-") {
                return 3;
            } else if (array.includes("-")) {
                return -1;
            }
        }
    }

    SumOperation(n1, n2) {
        return parseFloat(n1) + parseFloat(n2);
    }

    SubtractionOperation(n1, n2) {
        return parseFloat(n1) - parseFloat(n2);
    }

    MultiplicationOperation(n1, n2) {
        return parseFloat(n1) * parseFloat(n2);
    }

    DivisionOperation(n1, n2) {
        return parseFloat(n1) / parseFloat(n2);
    }

    ResolveMathOperation(n1, n2, operation) {
        switch (operation) {
            case 0:
                return calc.MultiplicationOperation(n1, n2);
            case 1:
                return calc.DivisionOperation(n1, n2);
            case 2:
                return calc.SumOperation(n1, n2);
            case 3:
                return calc.SubtractionOperation(n1, n2);
            default:
                console.log("Operation does not exist!");
                break;
        }
    }


    ResolveButtonPressed() {
        let upperValueArray = (this.upperValue.textContent).split(' ');
        let result = 0;
        for (let i = 0; i <= upperValueArray.length; i++) {
            let currentItem = upperValueArray[i];
            let operation = 0;

            let mathOperation = calc.FilterMathOperationOrder(currentItem, upperValueArray);
            if (mathOperation !== -1) {
                let n1 = upperValueArray[i - 1];
                let n2 = upperValueArray[i + 1];
                result = calc.ResolveMathOperation(n1, n2, mathOperation);
                operation = 1;
            }

            if (operation) {
                upperValueArray[i - 1] = result;
                upperValueArray.splice(i, 2);
                i = 0;
            }

            if (result) {
                calc.reset = 1;
            }

            calc.CalcDisplayUpdate(result);
        }
    }

    CalcButtonPressed() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        let reg = new RegExp('^\\d+$');

        //Reset
        if (calc.reset && reg.test(input)) {
            upperValue = '0';
        }
        calc.reset = 0;

        if (input === 'AC') {
            calc.ClearButtonPressed();
        } else if (input === '=') {
            calc.ResolveButtonPressed();
        } else {
            if (calc.FilterInput(input, upperValue, reg)) {
                return false;
            }

            if (!reg.test(input)) {
                input = ` ${input} `;
            }


            if (upperValue === "0") {
                if (reg.test(input)) {
                    calc.upperValue.textContent = input;
                }
            } else {
                calc.upperValue.textContent += input;
            }
        }

    }
}

let calc = new Calculator();

function Init() {
    if (calc) {
        let buttons = document.querySelectorAll('.btn');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', calc.CalcButtonPressed);
        }
    }
}

Init();

