class Calculator{
    constructor(previousOperandElement,currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete(){
        this.currentOperand  = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.previousOperand != ""){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }
    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr))
            return;
        switch(this.operation){
            case "+":
                computation = prev+curr;
                break;
            case "-":
                computation = prev-curr;
                break;
            case "*":
                computation = prev*curr;
                break;
            case "/":
                computation = prev/curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = ""
    }

    updateDisplay(){
        this.currentOperandElement.innerText = this.currentOperand;
        if(this.operation!=null){
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else{
        this.previousOperandElement.innerText = this.previousOperand;
        }
        this.currentOperandElement.innerText = this.currentOperand;
    }
}


const numberButtons = document.querySelectorAll("button[data-number]");
const operationButtons = document.querySelectorAll("button[data-operation]");
const equalsButton = document.querySelector("button[data-equals]");
const deleteButton = document.querySelector("button[data-delete]");
const allClearButton = document.querySelector("button[data-all-clear]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]");
const calculator = new Calculator(previousOperandElement,currentOperandElement);

numberButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

allClearButton.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
});


equalsButton.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
});
deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
});