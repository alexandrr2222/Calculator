function render(){
    
}
function add(x, y){
    return Number(x) + Number(y);
}
function subtract(x, y){
    return x - y;
}
function multiply(x, y){
    return x * y;
}
function divide(x, y){
    return x / y;
}
function squareRoot(x){
    return Math.sqrt(x);
}
function exponent(x, y){
    return x ** y;
}
function modulo(x, y){
    return x % y;
}
function roundNumbers(x){
    return Number.parseFloat(x).toFixed(state.roundingLevel)
}
function removeZeros(result){
    for(let i = 0; state.roundingLevel >= i; i++){
        let checker = result[result.length - 1];
        if(checker === "."){
            result = result.slice(0, result.length - 1);
            break;
        }
        else if(checker === "0"){
            result = result.slice(0, result.length - 1);
        }
        else{
            break;
        }
    }
    return result;
}
function operate(opr, numA, numB){
    if(opr==="+"){
        if(add(numA, numB) % 1 === 0){
            return add(numA, numB);
        }
        else return roundNumbers(add(numA, numB))
    }
    else if(opr==="-"){
        if(subtract(numA, numB) % 1 === 0){
            return subtract(numA, numB);
        }
        else return roundNumbers(subtract(numA, numB))
    }
    else if(opr==="*"){
        if(multiply(numA, numB) % 1 === 0){
            return multiply(numA, numB);
        }
        else return roundNumbers(multiply(numA, numB))
    }
    else if(opr==="÷"){
        if(divide(numA, numB) % 1 === 0){
            return divide(numA, numB);
        }
        else return roundNumbers(divide(numA, numB))
    }
    else if(opr==="√"){
        if(squareRoot(numB) % 1 === 0){
            return squareRoot(numB);
        }
        else return roundNumbers(squareRoot(numB))
    }
    else if(opr==="^"){
        if(exponent(numA, numB) % 1 === 0){
            return exponent(numA, numB);
        }
        else return roundNumbers(exponent(numA, numB))
    }
    else if(opr==="mod"){
        if(modulo(numA, numB) % 1 === 0){
            return modulo(numA, numB);
        }
        else return roundNumbers(modulo(numA, numB))
    }
}


const state = {
    firstOperand: "",
    secondOperand: "",
    operator: "",
    unaryMode: false,
    roundingLevel: 2,
}


const calcNumbers = document.querySelectorAll(".calcNumber");
const calcOperators = document.querySelectorAll(".calcOperator");
const screenNumber = document.querySelector("#screenNumber");
const equals = document.querySelector("#equals");
const cleaner = document.querySelector("#CButton");
const decimal = document.querySelector("#decimalButton");
const backspace = document.querySelector("#backspace");
const sng = document.querySelector(".sng");
const pi = document.querySelector("#pi");
const percentage = document.querySelector("#percentage");
const rnd = document.querySelector("#rounder");
const rndCounter = document.querySelector("#rndCounter");
const screenHistory = document.querySelector("#screenHistory");


window.addEventListener("keydown", (e) => {

});

backspace.addEventListener("click", () => {
    state.firstOperand = String(state.firstOperand);
    let totalLength = state.firstOperand.length + state.operator.length + state.secondOperand.length;
    if(state.firstOperand.length > 1 && state.operator === "" && state.secondOperand === ""){
        state.firstOperand = state.firstOperand.slice(0, (state.firstOperand.length - 1));
        screenNumber.textContent = state.firstOperand;
    }
    else if(state.operator !== "" && state.secondOperand === ""){
        state.operator = "";
        state.unaryMode = false;
        screenNumber.textContent = state.firstOperand;
    }
    else if(state.firstOperand !== "" && state.operator !== "" && state.secondOperand !== ""){
        state.secondOperand = state.secondOperand.slice(0, (state.secondOperand.length - 1));
        screenNumber.textContent = state.firstOperand + state.operator + state.secondOperand;
    }
    else if(totalLength === 1){
        state.firstOperand = "";
        screenNumber.textContent = 0;
    }
});
percentage.addEventListener("click", () => {
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
    if(!state.firstOperand.includes("%") && state.operator === ""){
            state.firstOperand = state.firstOperand + "%"; 
            screenNumber.textContent = state.firstOperand;            
    }
    else if(state.operator !== "" && !state.secondOperand.includes("%")){
            state.secondOperand = state.secondOperand + "%"; 
            screenNumber.textContent = state.firstOperand + state.operator + state.secondOperand;            
    }    
}); 
rnd.addEventListener("click", () => {
    state.roundingLevel += 1;
    if(state.roundingLevel === 6){
        state.roundingLevel = 0;
        rndCounter.textContent = "rnd: 0";
    }
    else rndCounter.textContent = "rnd: 0.".padEnd((state.roundingLevel + 7), "0")
});
sng.addEventListener("click", () => {
    state.unaryMode = true;
});
decimal.addEventListener("click", () => {
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
    if(!state.firstOperand.includes(".") && state.operator === ""){
        if(state.firstOperand === "" && !state.unaryMode){
            state.firstOperand = "0.";
            screenNumber.textContent = state.firstOperand;
        }
        else{
            state.firstOperand = state.firstOperand + "."; 
            screenNumber.textContent = state.firstOperand;            
        }

    }
    else if(!state.secondOperand.includes(".") && state.operator !== ""){
        if(state.secondOperand === ""){
            state.secondOperand = "0.";
            screenNumber.textContent = state.firstOperand + state.operator + state.secondOperand;
        }
        else{
            state.secondOperand = state.secondOperand + "."; 
            screenNumber.textContent = state.firstOperand + state.operator + state.secondOperand;            
        }
    }
});  
calcNumbers.forEach((number) => {
    number.addEventListener("click", () => {
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
        if(number.textContent === "π"){
            piNum = String(Math.PI.toFixed(state.roundingLevel));
            NumberFromKey = piNum;
        }
        else{
            NumberFromKey = number.textContent;
        }

        if(state.operator === ""){
            if(state.firstOperand !== "" && !state.firstOperand.includes("%")){
                state.firstOperand = state.firstOperand + NumberFromKey; 
                screenNumber.textContent = state.firstOperand;
            }
            else if(!state.firstOperand.includes("%")){
                screenNumber.style.fontSize = "3rem";
                state.firstOperand = NumberFromKey; 
                screenNumber.textContent = state.firstOperand;
            }
        }
        else{
            if(state.secondOperand !== "" && !state.secondOperand.includes("%")){
                state.secondOperand = state.secondOperand + NumberFromKey; 
                screenNumber.textContent = state.firstOperand + state.operator + state.secondOperand;
            }
            else if(!state.secondOperand.includes("%")){
                state.secondOperand = NumberFromKey;
                screenNumber.textContent = state.firstOperand + state.operator + state.secondOperand;
            }
        }
    });    
});
calcOperators.forEach((opr) => {
    opr.addEventListener("click", () => {
        if(state.secondOperand !== ""){
            screenHistory.textContent = state.firstOperand + state.operator + state.secondOperand;
            state.firstOperand = operate(state.operator, state.firstOperand, state.secondOperand);
            if(state.firstOperand === "NaN"){
                screenNumber.style.fontSize = "1.4rem";
                screenNumber.textContent = "Error: malformed expression";
                state.firstOperand = "";
                state.secondOperand = "";
                state.operator = "";
            }
            else{
            state.operator = `${opr.textContent}`;
            screenNumber.textContent = state.firstOperand + state.operator;
            state.secondOperand = ""; 
            }  
        }
        else{
        state.operator = `${opr.textContent}`;
        screenNumber.textContent = state.firstOperand + state.operator;
        }
    });    
});
equals.addEventListener("click", () => {
    screenHistory.textContent = state.firstOperand + state.operator + state.secondOperand;
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
    let zeroA = state.firstOperand[0]
    let zeroB = state.secondOperand[0]
    if(state.firstOperand.includes("%")){
        state.firstOperand = (state.firstOperand.slice(0, state.firstOperand.length - 1))/100;
    }
    if(state.secondOperand.includes("%")){
        state.secondOperand = (state.secondOperand.slice(0, state.secondOperand.length - 1))/100;
    }

    if(!state.unaryMode && (state.firstOperand === "" || state.secondOperand === "" || state.operator === "" || zeroA === "%" || zeroB === "%")){
        if(state.firstOperand !== "" && zeroA !== "%" && zeroB !== "%"){
            state.firstOperand = roundNumbers(state.firstOperand)
            screenNumber.textContent = state.firstOperand;
        }
        else{
        screenNumber.style.fontSize = "1.4rem";
        screenNumber.textContent = "Error: malformed expression";
        state.firstOperand = "";
        state.secondOperand = "";
        state.operator = "";
        }
    }
    else if(state.unaryMode && zeroB === "%"){
        screenNumber.style.fontSize = "1.4rem";
        screenNumber.textContent = "Error: malformed expression";
        state.firstOperand = "";
        state.secondOperand = "";
        state.operator = "";        
    }
    else if(state.unaryMode && state.firstOperand === "" && state.secondOperand !== ""){
        state.firstOperand = operate(state.operator, state.firstOperand, state.secondOperand);
        state.firstOperand = removeZeros(state.firstOperand);
        screenNumber.textContent = state.firstOperand;
        state.operator = "";
        state.secondOperand = "";
        state.unaryMode = false;
    }
    else{
        if(state.operator === "÷" && state.secondOperand === "0"){
            screenNumber.style.fontSize = "1.4rem";
            screenNumber.textContent = "Error: division by 0 is not possible";
            state.firstOperand = "";
            state.secondOperand = "";
            state.operator = "";
        }
        else if(state.operator === "mod" && state.secondOperand === "0"){
            screenNumber.style.fontSize = "1.4rem";
            screenNumber.textContent = "Error: modulo by 0 is not possible";
            state.firstOperand = "";
            state.secondOperand = "";
            state.operator = "";
        }
        else if(state.unaryMode){
            state.secondOperand = roundNumbers(squareRoot(state.secondOperand))
            state.firstOperand = operate("*", state.firstOperand, state.secondOperand);
            state.firstOperand = removeZeros(state.firstOperand);
            screenNumber.textContent = state.firstOperand;
            state.operator = "";
            state.secondOperand = "";
            state.unaryMode = false;
        }
        else{
            state.firstOperand = operate(state.operator, state.firstOperand, state.secondOperand);
            state.firstOperand = removeZeros(state.firstOperand);
            screenNumber.textContent = state.firstOperand;
            state.operator = "";
            state.secondOperand = "";
        }
    }
});
cleaner.addEventListener("click", () => {
    screenNumber.style.fontSize = "3rem";
    state.firstOperand = "";
    state.secondOperand = "";
    state.operator = "";
    state.unaryMode = false;
    screenNumber.textContent = 0;
    state.roundingLevel = 2;
    rndCounter.textContent = "rnd: 0.00";
});  

let NumberFromKey = "";
let piNum = String(Math.PI.toFixed(state.roundingLevel));
// pi overflow
// overflowing numbers n font size scroller
// keyboard support, sound