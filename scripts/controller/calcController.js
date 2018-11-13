class CalcController {

    constructor() {
        this._locale = "pt-BR"
        this._displayCalcEl = document.querySelector("#display"); //document.getElementId("display") -> Similar
        this._timeEl = document.querySelector("#hora");
        this._dateEl = document.querySelector("#data");
        this._currentDate;
        this._operation = [];
        this.initButtonsEvents();
        this.initialize();
    }

    initialize() {
        this.displayCalc;
        this.setDisplayDateTime();
        let interval = setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        this.setLastNumberToDisplay();
        /*setTimeout(()=>{
            clearInterval(interval);
        }, 10000)*/
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll() {
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError() {
        this.displayCalc = "Error";
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1]
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)
    }

    calc() {
        let last;
        if (this._operation.length > 3) {
            last = this._operation.pop();
        }
        let result = eval(this._operation.join(""));
        if (last == "%") {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if (last) this._operation.push(last);
        }
        this.setLastNumberToDisplay();
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }
    }

    setLastNumberToDisplay() {
        let lastNumber;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }
        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                this.setLastOperation(value);
            }
            else if (isNaN(value)) {

            }
            else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }

        }
        else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
            }
            else {
                this.setLastOperation(parseInt(this.getLastOperation().toString() + value.toString()));
                this.setLastNumberToDisplay();
            }


        }
        console.log(this._operation);
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case 'igual':
                this.calc();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach(btn => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace('btn-', "");

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayTime(valor) {
        this._timeEl.innerHTML = valor;
    }

    set displayDate(valor) {
        this._dateEl.innerHTML = valor;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    get currentDate() {
        return new Date();
    }

    set displayCalc(valor) {
        this._displayCalcEl.innerHTML = valor;
    }

    set dataAtual(valor) {
        this._currentDate = valor;
    }

}