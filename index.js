const display = document.getElementById(`display`);

function canAddDecimal() {
  const expression = display.value;

  const parts = expression.split(/[\+\-\*\/]/);
  const lastPart = parts[parts.length - 1];

  return !lastPart.includes(".");
}

function appendToDisplay(input) {
  const lastChar = display.value.slice(-1);

  if (input === ".") {
    if (display.value === "" || ["+", "-", "*", "/"].includes(lastChar)) {
      return;
    }

    const parts = display.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) {
      return;
    }
  }

  display.value += input;
}

function Total() {
  try {
    let expression = display.value;

    if (expression[0] === "+" || expression[0] === "-") {
      expression = "0" + expression;
    }

    while (/[+\-*/.]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }

    let tokens = expression.match(/(\d+\.?\d*|\.\d+|[+\-*/])/g);

    if (!tokens) {
      display.value = "Error";
      return;
    }

    for (let i = 0; i < tokens.length; i++) {
      if (!isNaN(tokens[i])) {
        tokens[i] = parseFloat(tokens[i]);
      }
    }

    let i = 0;
    while (i < tokens.length) {
      if (tokens[i] === "*" || tokens[i] === "/") {
        let prev = tokens[i - 1];
        let next = tokens[i + 1];
        let result = tokens[i] === "*" ? prev * next : prev / next;
        tokens.splice(i - 1, 3, result);
        i = 0;
      } else {
        i++;
      }
    }

    i = 0;
    while (i < tokens.length) {
      if (tokens[i] === "+" || tokens[i] === "-") {
        let prev = tokens[i - 1];
        let next = tokens[i + 1];
        let result = tokens[i] === "+" ? prev + next : prev - next;
        tokens.splice(i - 1, 3, result);
        i = 0;
      } else {
        i++;
      }
    }

    display.value = tokens[0];
  } catch {
    display.value = "Error";
  }

  resetDisplay = true;
}

function clearDisplay() {
  display.value = "";
}

function deleteLastNumber() {
  display.value = display.value.slice(0, -1);
}
