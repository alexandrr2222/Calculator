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
function operate(opr, numA, numB){
    if(opr==="+"){
        if(add(numA, numB) % 1 === 0){
            return add(numA, numB);
        }
        else return Number.parseFloat(add(numA, numB)).toFixed(2)
    }
    else if(opr==="-"){
        if(subtract(numA, numB) % 1 === 0){
            return subtract(numA, numB);
        }
        else return Number.parseFloat(subtract(numA, numB)).toFixed(2)
    }
    else if(opr==="*"){
        if(multiply(numA, numB) % 1 === 0){
            return multiply(numA, numB);
        }
        else return Number.parseFloat(multiply(numA, numB)).toFixed(2)
    }
    else if(opr==="/"){
        if(divide(numA, numB) % 1 === 0){
            return divide(numA, numB);
        }
        else return Number.parseFloat(divide(numA, numB)).toFixed(2)
    }
    else if(opr==="√"){
        return Number.parseFloat(squareRoot(numB)).toFixed(2)
    }
}

const calcNumbers = document.querySelectorAll(".calcNumber");
const calcOperators = document.querySelectorAll(".calcOperator");
const screenNumber = document.querySelector("#screen");
const equals = document.querySelector("#equals");
const cleaner = document.querySelector("#CButton");
const decimal = document.querySelector("#decimalButton");
const backspace = document.querySelector("#backspace");
const sng = document.querySelector(".sng");
const pi = document.querySelector("#pi");


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
sng.addEventListener("click", () => {
    singular = true;
}); 
decimal.addEventListener("click", () => {
    if(numberA === ""){
        numberA = "0.";
        screenNumber.textContent = numberA;
    }
    else if(numberB === ""){
        numberB = "0.";
        screenNumber.textContent = numberA + operator + numberB;
    }
});  
calcNumbers.forEach((number) => {
    number.addEventListener("click", () => {
        if(operator === ""){
            if(numberA !== ""){
                numberA = numberA + number.textContent; 
                screenNumber.textContent = numberA;
            }
            else{
                screenNumber.style.fontSize = "3rem";
                numberA = number.textContent; 
                screenNumber.textContent = numberA;
            }
        }
        else{
            if(numberB !== ""){
                numberB = numberB + number.textContent; 
                screenNumber.textContent = numberA + operator + numberB;
            }
            else{
                numberB = number.textContent;
                screenNumber.textContent = numberA + operator + numberB;
            }
        }
    });    
});
calcOperators.forEach((opr) => {
    opr.addEventListener("click", () => {
        if(numberB !== ""){
            numberA = operate(operator, numberA, numberB);
            operator = `${opr.textContent}`;
            screenNumber.textContent = numberA + operator;
            numberB = "";
        }
        else{
        operator = `${opr.textContent}`;
        screenNumber.textContent = numberA + operator;
        }
    });    
});
equals.addEventListener("click", () => {
    if(!singular && (numberA === "" || numberB === "" || operator === "")){
        screenNumber.style.fontSize = "1.4rem";
        screenNumber.textContent = "Error: malformed expression";
        numberA = "";
        numberB = "";
        operator = "";
    }
    else if(singular && numberA === "" && numberB !== ""){
        numberA = operate(operator, numberA, numberB);
        screenNumber.textContent = numberA;
        operator = "";
        numberB = "";
        singular = false;
    }
    else{
        if(operator === "/" && numberB === "0"){
            screenNumber.style.fontSize = "1.4rem";
            screenNumber.textContent = "Error: division by 0 is not possible";
            numberA = "";
            numberB = "";
            operator = "";
        }
        else if(singular){
            numberB = Number.parseFloat(squareRoot(numberB)).toFixed(2);
            numberA = operate("*", numberA, numberB);
            screenNumber.textContent = numberA;
            operator = "";
            numberB = "";
            singular = false;
        }
        else{
            numberA = operate(operator, numberA, numberB);
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
    screenNumber.textContent = 0;
});  

let singular = false;
let numberA = "";
let numberB = "";
let operator = "";


// overflowing numbers
// nefunkncni dot
// keyboard support
// css mouseover color, sound, one =, proper color