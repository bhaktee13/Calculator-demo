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
    let tokens = expression.match(/(\d+\.?\d*|\.\d+|[+\-*/])/g);

    if (!tokens) {
      display.value = "Error";
      return;
    }

    if (tokens[0] === "+" || tokens[0] === "-") {
      tokens.unshift("0");
    }

    if (/[+\-*/]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }

    let newTokens = [];
    let i = 0;
    while (i < tokens.length) {
      if (tokens[i] === "*" || tokens[i] === "/") {
        let prev = parseFloat(newTokens.pop());
        let next = parseFloat(tokens[i + 1]);
        let result = tokens[i] === "*" ? prev * next : prev / next;
        newTokens.push(result);
        i += 2;
      } else {
        newTokens.push(tokens[i]);
        i++;
      }
    }

    let result = parseFloat(newTokens[0]);
    i = 1;
    while (i < newTokens.length) {
      let op = newTokens[i];
      let num = parseFloat(newTokens[i + 1]);
      if (op === "+") {
        result += num;
      } else if (op === "-") {
        result -= num;
      }
      i += 2;
    }

    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}
