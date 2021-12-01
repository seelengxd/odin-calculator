function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

const operators = {
    "+": add,
    "-": subtract,
    "÷": divide,
    "*": multiply
}

function operate(operator, num1, num2){
    return operators[operator](num1, num2);
}

const prev = document.querySelector("#previous");
const curr = document.querySelector("#current")
let haveDot = false;

function pressNumber(number){
    if (!(prev.textContent !== "" && curr.textContent === "")) curr.textContent += number;
}

document.querySelectorAll(".number").forEach(button => button.addEventListener("click", () => pressNumber(button.dataset.value)));

function clear(){
    prev.textContent = "";
    curr.textContent = "";
    haveDot = false;
}

document.querySelector("button[data-value='AC']").addEventListener("click", clear);

function del(){
    if (curr.textContent[curr.textContent.length - 1] === ".") haveDot = false;
    curr.textContent = curr.textContent.slice(0, curr.textContent.length - 1);
}

document.querySelector("button[data-value='DEL']").addEventListener("click", del);

function equal(){
    if (curr.textContent !== "" && !(curr.textContent in operators)){
        if (curr.textContent[0] in operators){
            const num1 = +prev.textContent;
            const num2 = +curr.textContent.slice(1);
            const op = curr.textContent[0];
            const result = +(operate(op, num1, num2).toFixed(6))
            if (result !== Infinity){
                curr.textContent = result;
                prev.textContent = "";
            } else {
                curr.textContent = "lmao divide by zero??";
                setTimeout(clear, 500);
            }
            
        } 
    }
}

document.querySelector("button[data-value='=']").addEventListener("click", equal);

function pressOperator(operator){
    if (curr.textContent in operators){
        return;
    }
    else if (prev.textContent === ""){
        if (curr.textContent !== ""){
            prev.textContent = curr.textContent;
            curr.textContent = operator;
        }
    } else if (curr.textContent === ""){
        curr.textContent = operator;
    } else {
        equal();
        curr.textContent = operator;
    }
}

document.querySelectorAll(".operator").forEach(button => button.addEventListener("click", () => pressOperator(button.dataset.value)));

function pressDot(){
    if (!haveDot){
        curr.textContent += "."
        haveDot = true;
    }
}

document.querySelector("button[data-value='.']").addEventListener("click", pressDot);

// keyboard support

const keyToFunction = {
    "0": () => pressNumber("0"),
    "1": () => pressNumber("1"),
    "2": () => pressNumber("2"),
    "3": () => pressNumber("3"),
    "4": () => pressNumber("4"),
    "5": () => pressNumber("5"),
    "6": () => pressNumber("6"),
    "7": () => pressNumber("7"),
    "8": () => pressNumber("8"),
    "9": () => pressNumber("9"),
    "+": () => pressOperator("+"),
    "-": () => pressOperator("-"),
    "x": () => pressOperator("*"),
    "/": () => pressOperator("÷"),
    "Enter": equal,
    ".": pressDot,
    "Backspace": del
}

function pressKey(key){
    if (key in keyToFunction) keyToFunction[key]();
}
document.querySelector("body").addEventListener('keydown', e => pressKey(e.key));