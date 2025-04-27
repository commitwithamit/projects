const input = document.getElementById("display");
const btnCon = document.querySelector(".btns-box");
const clearBtn = document.querySelector(".clear");
const resultBtn = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const ptheBtn = document.querySelector("#parenthesis");
const historyBtn = document.querySelector(".history");
const historyCon = document.querySelector(".history-box");
const historyChild = document.querySelector(".history-box>div");
const infoBtn = document.getElementById("info");
let openParenthesis = 0;
const history = [];

ptheBtn.addEventListener("click", function (e) {
    this.blur();
    const value = input.value;
    const lastChar = value.slice(-1);

    const openCount = (value.match(/\(/g) || []).length;
    const closeCount = (value.match(/\)/g) || []).length;

    if (openCount > closeCount && /[0-9.)]/.test(lastChar)) {
        input.value += ")";
    }

    else if (/^\d+(\.)?$/.test(value) || /^\d+(\.\d+)?$/.test(value) || /[0-9).]/.test(lastChar)) {
        input.value += "*(";
    }

    else if (
        value === "" ||
        openCount === closeCount ||
        lastChar === "(" ||
        /[+\-*/(]/.test(lastChar)
    ) {
        input.value += "(";
    }
});

btnCon.addEventListener("click", function (e) {
    let currentVal = e.target.dataset.value;
    adjustFontSize();
    setTimeout(() => {
        input.scrollTop = input.scrollHeight - 1;
    }, 0);

    if (
        currentVal !== undefined &&
        currentVal !== null &&
        currentVal != "" &&
        currentVal != "clear" &&
        currentVal != "result"
    ) {
        let prevVal = input.value;
        let newVal = prevVal + currentVal;

        const lastNumber = newVal.split(/[\+\-\*\/÷\(\)]/).pop();
        const digitCount = lastNumber.replace(/[^0-9]/g, "");

        if (digitCount.length > 15) {
            showError(`<b>Invalid input:</b><br>Can't enter more than 15 digits`);
            return;
        }

        if (/\d/.test(newVal[newVal.length - 1]) || /\./.test(newVal[newVal.length - 1])) {
            let lastVal = newVal[newVal.length - 1];
            let last2nd = newVal[newVal.length - 2];
            if (last2nd === ")" && /\d/.test(lastVal)) {
                let newString = newVal.slice(0, -1);
                newVal = `${newString}*${lastVal}`;
            }
            if (last2nd === ")" && /\./.test(lastVal)) {
                let newString = newVal.slice(0, -1);
                newVal = `${newString}*0${lastVal}`;
            }
        }

        if (prevVal == "" && /[+\-*/÷]/.test(currentVal)) {
            return showError("Invalid input");
        }

        if (/[+\-*/÷]/.test(prevVal[prevVal.length - 1]) && /[+\-/*÷]/.test(currentVal)) {
            let withoutLastChar = prevVal.slice(0, -1);
            newVal = withoutLastChar + currentVal;
        }

        if (/[.]/.test(currentVal)) {
            if (prevVal[prevVal.length - 1] == ".") {
                let withoutLastChar = prevVal.slice(0, -1);
                newVal = withoutLastChar + currentVal;
            }
        }

        if (/\d+\.\d{1,10}\.$/g.test(newVal)) {
            newVal = newVal.slice(0, -1);
        }

        if (/\d+(\.\d{11,})/.test(newVal)) {
            showError(`<b>Invalid input:</b><br>Can't enter more than 10 digits after decimal points.`);
            return;
        }

        if (/^\.|[+\-*/÷()]\.$/.test(newVal)) {
            if (prevVal != "") {
                newVal = prevVal + "0.";
            } else {
                newVal = "0.";
            }
        }

        if (/\([\*|\/|÷]/.test(newVal)) {
            showError(`<b>Invalid operator:</b><br>Use only + or - operator after "("`);
            return;
        }

        input.value = newVal;
    }
    if (e.target != resultBtn) {
        e.target.blur();
    }
});

const keyMap = {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "÷",
    ".": ".",
    "Escape": "clear",
    "Delete": "clear",
    "Enter": "result"
}
window.addEventListener("keydown", function (e) {
    const value = keyMap[e.key];
    if (e.key === "Backspace") {
        deleteBtn.click();
        deleteBtn.classList.add("pressed");
        setTimeout(() => {
            deleteBtn.classList.remove("pressed");
        }, 200);
    }
    if (e.key === "(" || e.key === ")") {
        ptheBtn.click();
        ptheBtn.classList.add("pressed");
        setTimeout(() => {
            ptheBtn.classList.remove("pressed");
        }, 200);
    }
    if (value) {
        const btn = document.querySelector(`button[data-value='${value}']`);
        if (btn) {
            btn.click();
            btn.classList.add("pressed");
            setTimeout(() => {
                btn.classList.remove("pressed");
            }, 200);
        };
    }
});

clearBtn.addEventListener("click", function (e) {
    input.value = "";
    this.blur();
});

deleteBtn.addEventListener("click", function (e) {
    input.value = input.value.slice(0, -1);
    this.blur();
});

resultBtn.addEventListener("click", function () {
    let eval = input.value.replace(/÷/g, "/");

    const divisionMatches = [...eval.matchAll(/\/([0-9.]+)/g)];
    for (const match of divisionMatches) {
        const num = parseFloat(match[1]);
        if (num === 0) {
            showError("division by zero");
            return;
        }
    }

    if (/^[0-9+\-*/.()]+$/.test(eval)) {
        let answer = roundOff(calculator(eval));
        if (isNaN(answer) || answer == undefined) {
            showError("Invalid input");
            return;
        }
        if (!isFinite(answer)) {
            showError("division by zero");
            return;
        }
        history.push({ exp: eval, result: answer });
        updateHistory();
        input.value = answer;
    } else {
        if (eval == "") {
            return;
        } else {
            showError(`<b>Invalid input:</b><br>Only numbers and + - * / operators are allowed.`);
            return;
        }
    }
});
function adjustFontSize() {
    const maxFont = 32;
    const medFont = 25;
    const minFont = 22;

    let length = input.value.length;
    let newFontSize;
    if (length >= 10 && length < 15) {
        newFontSize = medFont;
    } else if (length <= 10) {
        newFontSize = maxFont;
    } else if (length >= 15) {
        newFontSize = minFont;
    } else if (length <= 15 && length >= 10) {
        newFontSize = medFont;
    }
    input.style.fontSize = `${newFontSize}px`;
}
function showError(msg) {
    if (msg != "") {
        let modal = document.querySelector(".error");
        let msgHere = document.querySelector(".message");
        let close = document.querySelector(".close");
        let body = document.querySelector("body");
        let allInputs = document.querySelectorAll("input, button, select, textarea, a");

        modal.style.display = "flex";
        msgHere.innerHTML = msg;

        body.style.pointerEvents = "none";
        modal.style.pointerEvents = "auto";
        allInputs.forEach(input => input.setAttribute("disabled", "true"));

        close.addEventListener("click", () => {
            modal.style.display = "none";
            body.style.pointerEvents = "auto";
            allInputs.forEach(input => input.removeAttribute("disabled"));
        });
    }

}

function calculator(string) {
    if (!string || typeof string !== "string" || string == "") {
        showError("Please provide a non-empty string.");
        return;
    }

    const openCount = (string.match(/\(/g) || []).length;
    const closeCount = (string.match(/\)/g) || []).length;
    if (openCount > closeCount) {
        string += ")".repeat(openCount - closeCount);
    }

    let infix = tokenize(string);

    let postFix = [];
    let opStack = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

    for (let char of infix) {
        if (/^-?\d+(\.\d+)?$/.test(char)) {
            postFix.push(char);
        } else if (char === "(") {
            opStack.push(char);
        } else if (char === ")") {
            while (opStack.length && opStack[opStack.length - 1] !== "(") {
                postFix.push(opStack.pop(char));
            }
            opStack.pop();
        } else if (/\+|\-|\*|\//.test(char)) {
            while (
                opStack.length &&
                precedence[opStack[opStack.length - 1]] >= precedence[char]
            ) {
                postFix.push(opStack.pop());
            }
            opStack.push(char);
        }
    }
    let opLength = opStack.length;
    for (let i = 0; i < opLength; i++) {
        postFix.push(opStack.pop());
    }
    let result = [];
    for (let i = 0; i < postFix.length; i++) {
        if (["*", "/", "+", "-"].includes(postFix[i])) {
            let last2Val = result.slice(-2); // 
            if (result.length == 1) {
                result[0] = Number(postFix[i] + result[0]);
            } else {
                result.splice(result.length - 2, 2);
                let a = Number(last2Val[0]);
                let b = Number(last2Val[1]);
                const operator = postFix[i];
                switch (operator) {
                    case "*":
                        result.push(a * b);
                        break;
                    case "/":
                        result.push(a / b);
                        break;
                    case "+":
                        result.push(a + b);
                        break;
                    case "-":
                        result.push(a - b);
                        break;
                }
            }

        } else {
            result.push(postFix[i]);
        }
    }
    return result[0];
}
function tokenize(exp) {
    let token = [];
    let num = "";

    for (let i = 0; i < exp.length; i++) {
        let char = exp[i];
        if (/\d|\./.test(char)) {
            num += char;
        } else {
            if (num !== "") {
                token.push(num);
                num = "";
            }
            if (char === "-" && exp[i - 1] === "(") {
                num = "-";
            } else {
                token.push(char);
            }
        }
    }
    if (num !== "") token.push(num);
    return token;
}

historyBtn.addEventListener("click", function () {
    this.classList.toggle("acitve");
    this.blur();
    console.log(history);
    if (history.length > 0) {
        document.querySelector(".empty-history").style.display = "none";
    }
    if (this.classList.contains("acitve")) {
        historyCon.style.transform = "translateX(-50%) scale(1)";
    } else {
        historyCon.style.transform = "translateX(-50%) scale(0)";
    }
});

function updateHistory() {
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    p1.setAttribute("class", "equ");
    p2.setAttribute("class", "equ-ans");

    p1.textContent = history[history.length - 1].exp.replace("/", "÷");
    p2.textContent = `=${history[history.length - 1].result}`;

    div.append(p1, p2);
    historyChild.append(div);
}

function roundOff(num, precision = 10) {
    let number = Number(num);
    if (Number.isInteger(number)) return number; // already clean
    const rounded = parseFloat(number.toFixed(precision));
    return Math.abs(rounded - Math.round(rounded)) < 1e-9 ? Math.round(rounded) : rounded;
}

infoBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
        document.querySelector(".details").style.transform = "translate(-50%, -50%) scale(1)";
    } else {
        document.querySelector(".details").style.transform = "translate(-50%, -50%) scale(0)";
    }
});
document.body.addEventListener("click", function (e) {
    e.stopPropagation();
    if (infoBtn.classList.contains("active")) {
        infoBtn.classList.remove("active");
        document.querySelector(".details").style.transform = "translate(-50%, -50%) scale(0)";
    }
});
document.querySelector(".details").addEventListener("click", function (e) {
    e.stopPropagation();
    document.querySelector(".details").style.transform = "translate(-50%, -50%) scale(1)";
});
