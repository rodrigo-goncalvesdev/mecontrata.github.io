const display = document.getElementById("display");
const buttonsContainer = document.getElementById("calc-buttons");

function addToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Erro";
    }
}

function toggleSign() {
    if (!display.value) return;
    display.value = eval(display.value) * -1;
}

function percentage() {
    if (!display.value) return;
    display.value = eval(display.value) / 100;
}

function createButtons() {
    const buttons = [
        "limp","C","%","/",
        "7","8","9","*",
        "4","5","6","-",
        "1","2","3","+",
        "+/-","0",".","="
    ];

    buttons.forEach(text => {
        const btn = document.createElement("button");
        btn.innerText = text;

        btn.addEventListener("click", () => {
            switch (text) {
                case "=":
                    calculate();
                    break;
                case "C":
                    clearDisplay();
                    break;
                case "limp":
                    backspace();
                    break;
                case "+/-":
                    toggleSign();
                    break;
                case "%":
                    percentage();
                    break;
                default:
                    addToDisplay(text);
            }
        });

        buttonsContainer.appendChild(btn);
    });
}

createButtons();
