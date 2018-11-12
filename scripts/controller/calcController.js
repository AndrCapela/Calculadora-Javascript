class CalcController {

    constructor() {
        this._locale = "pt-BR"
        this._displayCalcEl = document.querySelector("#display"); //document.getElementId("display") -> Similar
        this._timeEl = document.querySelector("#hora");
        this._dateEl = document.querySelector("#data");
        this._currentDate;
        this.initialize();
    }

    initialize() {
        this.displayCalc = 0;
        this.setDisplayDateTime();
        let interval = setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        /*setTimeout(()=>{
            clearInterval(interval);
        }, 10000)*/
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")
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