function render(){
    screenNumber.style.fontSize = "3rem";
    screenNumber.textContent = state.firstOperand + state.operator + state.secondOperand;
}
function renderResult(){
    screenNumber.style.fontSize = "3rem";
    screenNumber.textContent = state.firstOperand;
}
function updateHistory(){
    screenHistory.textContent = state.firstOperand + state.operator + state.secondOperand;
}
function errorME(){
    screenNumber.style.fontSize = "1.4rem";
    screenNumber.textContent = "Error: malformed expression";
    state.firstOperand = "";
    state.secondOperand = "";
    state.operator = "";
}
function playClick(){
    const clone = clickSound.cloneNode();
    clone.play();
}
function removeTransition(e){
    if(e.propertyName !== "transform"){
        return;
    }
    this.classList.remove("effect");
}
function overflowChecker(){
    screenLength = (state.firstOperand + state.operator + state.secondOperand).length;
}
// EVENT FUNCTIONS##############################
function doBackspace(){
    state.firstOperand = String(state.firstOperand);
    let totalLength = state.firstOperand.length + state.operator.length + state.secondOperand.length;
    if(state.firstOperand.length > 1 && state.operator === "" && state.secondOperand === ""){
        state.firstOperand = state.firstOperand.slice(0, (state.firstOperand.length - 1));
        render();
    }
    else if(state.operator !== "" && state.secondOperand === ""){
        state.operator = "";
        state.unaryMode = false;
        render();
    }
    else if(state.firstOperand !== "" && state.operator !== "" && state.secondOperand !== ""){
        state.secondOperand = state.secondOperand.slice(0, (state.secondOperand.length - 1));
        render();
    }
    else if(totalLength === 1){
        state.firstOperand = "";
        screenNumber.textContent = "0";
    }
}
function doPercentage(){
    overflowChecker()
    if(screenLength > 12)return;
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
    if(!state.firstOperand.includes("%") && state.operator === ""){
            state.firstOperand = state.firstOperand + "%"; 
            render();            
    }
    else if(state.operator !== "" && !state.secondOperand.includes("%")){
            state.secondOperand = state.secondOperand + "%"; 
            render();            
    }  
}
function doRounding(){
    state.roundingLevel += 1;
    if(state.roundingLevel === 6){
        state.roundingLevel = 0;
        rndCounter.textContent = "rnd: 0";
    }
    else rndCounter.textContent = "rnd: 0.".padEnd((state.roundingLevel + 7), "0")
}
function doSquareRoot(){
    overflowChecker()
    if(screenLength > 12)return;
    state.unaryMode = true;
}
function doDecimal(){
    overflowChecker()
    if(screenLength > 12)return;
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
    if(!state.firstOperand.includes(".") && state.operator === ""){
        if(state.firstOperand === "" && !state.unaryMode){
            state.firstOperand = "0.";
            render();
        }
        else{
            state.firstOperand = state.firstOperand + "."; 
            render();            
        }

    }
    else if(!state.secondOperand.includes(".") && state.operator !== ""){
        if(state.secondOperand === ""){
            state.secondOperand = "0.";
            render();
        }
        else{
            state.secondOperand = state.secondOperand + "."; 
            render();            
        }
    }
}
function doEqualize(){
    updateHistory()
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
            renderResult()
        }
        else{
            errorME();
        }
    }
    else if(state.unaryMode && zeroB === "%"){
        errorME();
    }
    else if(state.unaryMode && state.firstOperand === "" && state.secondOperand !== ""){
        state.firstOperand = operate(state.operator, state.firstOperand, state.secondOperand);
        state.firstOperand = removeZeros(state.firstOperand);
        renderResult()
        state.operator = "";
        state.secondOperand = "";
        state.unaryMode = false;
    }
    else{
        if(state.operator === "÷" && state.secondOperand === "0"){
            errorME();
            screenNumber.textContent = "Error: division by 0 is not possible";
        }
        else if(state.operator === "mod" && state.secondOperand === "0"){
            errorME();
            screenNumber.textContent = "Error: modulo by 0 is not possible";
        }
        else if(state.unaryMode){
            state.secondOperand = roundNumbers(squareRoot(state.secondOperand))
            state.firstOperand = operate("×", state.firstOperand, state.secondOperand);
            state.firstOperand = removeZeros(state.firstOperand);
            renderResult()
            state.operator = "";
            state.secondOperand = "";
            state.unaryMode = false;
        }
        else{
            state.firstOperand = operate(state.operator, state.firstOperand, state.secondOperand);
            state.firstOperand = removeZeros(state.firstOperand);
            renderResult()
            state.operator = "";
            state.secondOperand = "";
        }
    }
}
function doClean(){
    screenNumber.style.fontSize = "3rem";
    state.firstOperand = "";
    state.secondOperand = "";
    state.operator = "";
    state.unaryMode = false;
    screenNumber.textContent = 0;
    state.roundingLevel = 2;
    rndCounter.textContent = "rnd: 0.00";
    screenHistory.textContent = "";
}
function doNumbers(){
    overflowChecker()
    if(screenLength > 12)return;
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
    if(state.operator === ""){
        if(state.firstOperand !== "" && !state.firstOperand.includes("%")){
            state.firstOperand = state.firstOperand + numberFromKey; 
            render();
        }
        else if(!state.firstOperand.includes("%")){
            state.firstOperand = numberFromKey; 
            render();
        }
    }
    else{
        if(state.secondOperand !== "" && !state.secondOperand.includes("%")){
            state.secondOperand = state.secondOperand + numberFromKey; 
            render();
        }
        else if(!state.secondOperand.includes("%")){
            state.secondOperand = numberFromKey;
            render();
        }
    }
}
function doOperator(){
    overflowChecker()
    if(screenLength > 12)return;
    if(state.secondOperand !== ""){
        updateHistory()
        render()
        state.firstOperand = operate(state.operator, state.firstOperand, state.secondOperand);
        if(state.firstOperand === "NaN"){
            errorME();
        }
        else{
        state.operator = `${operatorFromKey}`;
        screenNumber.textContent = state.firstOperand + state.operator;
        state.secondOperand = ""; 
        }  
    }
    else{
    state.operator = `${operatorFromKey}`;
    render()
    }
}
// ##############################




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
    else if(opr==="×"){
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
const keyMap = {
   "Enter": "=",
    "C": "c",
    "Delete":"Backspace",
    "R":"r",
    "M":"m",
    "P":"p",
    "÷":"/",
    "E":"e",
    ",":".",
    "S":"s",
}

const calcButton = document.querySelectorAll(".calcButton");
const calcButtonClass = document.querySelector(".calcButton");
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
const clickSound = document.querySelector("#clickSound");

calcButton.forEach(btn => btn.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", (e) => {
    const key = keyMap[e.key] || e.key;
    const classKey = document.querySelector(`.calcButton[data-key="${key}"]`)
    if(classKey) classKey.classList.add("effect");
    e.preventDefault();
    switch(key){
        case "Backspace":
            playClick();
            doBackspace();
            break;
        case "Delete":
            playClick();
            doBackspace();
            break;
        case "%":
            playClick();
            doPercentage();
            break;
        case "R":
        case "r":
            playClick();
            doRounding();
            break;
        case ".":
        case ",":
            playClick();
            doDecimal();
            break;
        case "=":
        case "Enter":
            playClick();
            doEqualize();
            break;
        case "C":
        case "c":
            playClick();
            doClean();
            break;
        default:
            break;
    }
    switch(true){
        case (/^[0-9p]$/.test(key)):
            playClick();
            numberFromKey = key;
            if(key === "p"){
                piNum = String(Math.PI.toFixed(state.roundingLevel));
                numberFromKey = piNum;
            }
            doNumbers();
            break;
        case (/^[*\-+/mMeEsS]$/.test(key)):
            operatorFromKey = key;
            switch(key){
                case "/":
                    operatorFromKey = "÷";
                    break;
                case "m":
                case "M":
                    operatorFromKey = "mod";
                    break;
                case "e":
                case "E":
                    operatorFromKey = "^";
                    break;
                case "*":
                    operatorFromKey = "×";
                    break;
                case "s":
                case "S":
                    operatorFromKey = "√";
                    doSquareRoot();
                    break;
                default:
                    break;
            }
            playClick();
            doOperator();
            break;
        default:
            break;
    }
});

backspace.addEventListener("click", () => {
    playClick();
    doBackspace();
});
percentage.addEventListener("click", () => {
    playClick();
    doPercentage();
}); 
rnd.addEventListener("click", () => {
    playClick();
    doRounding();
});
sng.addEventListener("click", () => {
    playClick();
    doSquareRoot();
});
decimal.addEventListener("click", () => {
    playClick();
    doDecimal();
});  
calcNumbers.forEach((number) => {
    number.addEventListener("click", () => {
        playClick();
    state.firstOperand = String(state.firstOperand);
    state.secondOperand = String(state.secondOperand);
        if(number.textContent === "π"){
            piNum = String(Math.PI.toFixed(state.roundingLevel));
            numberFromKey = piNum;
        }
        else{
            numberFromKey = number.textContent;
        }
        doNumbers();
    });    
});
calcOperators.forEach((opr) => { 
    opr.addEventListener("click", () => {
    operatorFromKey = opr.textContent;
    if(operatorFromKey === "Xy") operatorFromKey = "^";
    playClick();
    doOperator();
});
})
equals.addEventListener("click", () => {
    playClick();
 doEqualize();
});
cleaner.addEventListener("click", () => {
    playClick();
    doClean();
});  

let numberFromKey = "";
let operatorFromKey = "";
let screenLength = ""
let piNum = String(Math.PI.toFixed(state.roundingLevel));

// pi overflow
// bad overflower checker
// if you click one button too fast it breaks animation
// animation and sound toggle button