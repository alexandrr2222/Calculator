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
function removeZeros(result){
    for(let i = 0; rounder >= i; i++){
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
        else return Number.parseFloat(add(numA, numB)).toFixed(rounder)
    }
    else if(opr==="-"){
        if(subtract(numA, numB) % 1 === 0){
            return subtract(numA, numB);
        }
        else return Number.parseFloat(subtract(numA, numB)).toFixed(rounder)
    }
    else if(opr==="*"){
        if(multiply(numA, numB) % 1 === 0){
            return multiply(numA, numB);
        }
        else return Number.parseFloat(multiply(numA, numB)).toFixed(rounder)
    }
    else if(opr==="÷"){
        if(divide(numA, numB) % 1 === 0){
            return divide(numA, numB);
        }
        else return Number.parseFloat(divide(numA, numB)).toFixed(rounder)
    }
    else if(opr==="√"){
        if(squareRoot(numB) % 1 === 0){
            return squareRoot(numB);
        }
        else return Number.parseFloat(squareRoot(numB)).toFixed(rounder)
    }
    else if(opr==="^"){
        if(exponent(numA, numB) % 1 === 0){
            return exponent(numA, numB);
        }
        else return Number.parseFloat(exponent(numA, numB)).toFixed(rounder)
    }
    else if(opr==="mod"){
        if(modulo(numA, numB) % 1 === 0){
            return modulo(numA, numB);
        }
        else return Number.parseFloat(modulo(numA, numB)).toFixed(rounder)
    }
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




backspace.addEventListener("click", () => {
    numberA = String(numberA);
    let totalLength = numberA.length + operator.length + numberB.length;
    if(numberA.length > 1 && operator === "" && numberB === ""){
        numberA = numberA.slice(0, (numberA.length - 1));
        screenNumber.textContent = numberA;
    }
    else if(operator !== "" && numberB === ""){
        operator = "";
        singular = false;
        screenNumber.textContent = numberA;
    }
    else if(numberA !== "" && operator !== "" && numberB !== ""){
        numberB = numberB.slice(0, (numberB.length - 1));
        screenNumber.textContent = numberA + operator + numberB;
    }
    else if(totalLength === 1){
        numberA = "";
        screenNumber.textContent = 0;
    }
}); 
percentage.addEventListener("click", () => {
    numberA = String(numberA);
    numberB = String(numberB);
    if(!numberA.includes("%") && operator === ""){
            numberA = numberA + "%"; 
            screenNumber.textContent = numberA;            
    }
    else if(operator !== "" && !numberB.includes("%")){
            numberB = numberB + "%"; 
            screenNumber.textContent = numberA + operator + numberB;            
    }    
}); 
rnd.addEventListener("click", () => {
    rounder = rounder + 1;
    zeroCounter += "0"
    if(rounder === 6){
        rounder = 0;
        zeroCounter = "."
        rndCounter.textContent = "rnd: 0";
    }
    else rndCounter.textContent = `rnd: 0${zeroCounter}`

});
sng.addEventListener("click", () => {
    singular = true;
});
decimal.addEventListener("click", () => {
    numberA = String(numberA);
    numberB = String(numberB);
    if(!numberA.includes(".") && operator === ""){
        if(numberA === "" && !singular){
            numberA = "0.";
            screenNumber.textContent = numberA;
        }
        else{
            numberA = numberA + "."; 
            screenNumber.textContent = numberA;            
        }

    }
    else if(!numberB.includes(".") && operator !== ""){
        if(numberB === ""){
            numberB = "0.";
            screenNumber.textContent = numberA + operator + numberB;
        }
        else{
            numberB = numberB + "."; 
            screenNumber.textContent = numberA + operator + numberB;            
        }
    }
});  
calcNumbers.forEach((number) => {
    number.addEventListener("click", () => {
    numberA = String(numberA);
    numberB = String(numberB);
        if(number.textContent === "π"){
            piNum = String(Math.PI.toFixed(rounder));
            NumberFromKey = piNum;
        }
        else{
            NumberFromKey = number.textContent;
        }

        if(operator === ""){
            if(numberA !== "" && !numberA.includes("%")){
                numberA = numberA + NumberFromKey; 
                screenNumber.textContent = numberA;
            }
            else if(!numberA.includes("%")){
                screenNumber.style.fontSize = "3rem";
                numberA = NumberFromKey; 
                screenNumber.textContent = numberA;
            }
        }
        else{
            if(numberB !== "" && !numberB.includes("%")){
                numberB = numberB + NumberFromKey; 
                screenNumber.textContent = numberA + operator + numberB;
            }
            else if(!numberB.includes("%")){
                numberB = NumberFromKey;
                screenNumber.textContent = numberA + operator + numberB;
            }
        }
    });    
});
calcOperators.forEach((opr) => {
    opr.addEventListener("click", () => {
        if(numberB !== ""){
            screenHistory.textContent = numberA + operator + numberB;
            numberA = operate(operator, numberA, numberB);
            if(numberA === "NaN"){
                screenNumber.style.fontSize = "1.4rem";
                screenNumber.textContent = "Error: malformed expression";
                numberA = "";
                numberB = "";
                operator = "";
            }
            else{
            operator = `${opr.textContent}`;
            screenNumber.textContent = numberA + operator;
            numberB = ""; 
            }  
        }
        else{
        operator = `${opr.textContent}`;
        screenNumber.textContent = numberA + operator;
        }
    });    
});
equals.addEventListener("click", () => {
    screenHistory.textContent = numberA + operator + numberB;
    numberA = String(numberA);
    numberB = String(numberB);
    let zeroA = numberA[0]
    let zeroB = numberB[0]
    if(numberA.includes("%")){
        numberA = (numberA.slice(0, numberA.length - 1))/100;
    }
    if(numberB.includes("%")){
        numberB = (numberB.slice(0, numberB.length - 1))/100;
    }

    if(!singular && (numberA === "" || numberB === "" || operator === "" || zeroA === "%" || zeroB === "%")){
        if(numberA !== "" && zeroA !== "%" && zeroB !== "%"){
            numberA = Number.parseFloat(numberA).toFixed(rounder);
            screenNumber.textContent = numberA;
        }
        else{
        screenNumber.style.fontSize = "1.4rem";
        screenNumber.textContent = "Error: malformed expression";
        numberA = "";
        numberB = "";
        operator = "";
        }
    }
    else if(singular && zeroB === "%"){
        screenNumber.style.fontSize = "1.4rem";
        screenNumber.textContent = "Error: malformed expression";
        numberA = "";
        numberB = "";
        operator = "";        
    }
    else if(singular && numberA === "" && numberB !== ""){
        numberA = operate(operator, numberA, numberB);
        numberA = removeZeros(numberA);
        screenNumber.textContent = numberA;
        operator = "";
        numberB = "";
        singular = false;
    }
    else{
        if(operator === "÷" && numberB === "0"){
            screenNumber.style.fontSize = "1.4rem";
            screenNumber.textContent = "Error: division by 0 is not possible";
            numberA = "";
            numberB = "";
            operator = "";
        }
        else if(operator === "mod" && numberB === "0"){
            screenNumber.style.fontSize = "1.4rem";
            screenNumber.textContent = "Error: modulo by 0 is not possible";
            numberA = "";
            numberB = "";
            operator = "";
        }
        else if(singular){
            numberB = Number.parseFloat(squareRoot(numberB)).toFixed(rounder);
            numberA = operate("*", numberA, numberB);
            numberA = removeZeros(numberA);
            screenNumber.textContent = numberA;
            operator = "";
            numberB = "";
            singular = false;
        }
        else{
            numberA = operate(operator, numberA, numberB);
            numberA = removeZeros(numberA);
            screenNumber.textContent = numberA;
            operator = "";
            numberB = "";
        }
    }
});
cleaner.addEventListener("click", () => {
    screenNumber.style.fontSize = "3rem";
    numberA = "";
    numberB = "";
    operator = "";
    singular = false;
    screenNumber.textContent = 0;
});  

let rounder = 2;
let NumberFromKey = "";
let singular = false;
let numberA = "";
let numberB = "";
let operator = "";
let piNum = String(Math.PI.toFixed(rounder));
let zeroCounter = ".00"
// pi overflow
// overflowing numbers n font size scroller
// keyboard support, sound