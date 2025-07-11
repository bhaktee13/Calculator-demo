const display = document.getElementById(`display`);

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

    let endsWithPercent = expression.endsWith("%");

    if (expression[0] === "+" || expression[0] === "-") {
      expression = "0" + expression;
    }

    while (/[+\-*/.√]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }

    if (endsWithPercent) {
      expression = expression.slice(0, -1);
    }

    expression = expression.replace(/(\d)(√)/g, "$1*$2");

    let tokens = expression.match(/(\d+\.?\d*|\.\d+|[+\-*/√()])/g);

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
      if (tokens[i] === "√") {
        if (i + 1 >= tokens.length || isNaN(tokens[i + 1])) {
          display.value = "Error";
          return;
        }
        let next = tokens[i + 1];
        let result = Math.sqrt(next).toFixed(3);
        result = parseFloat(result);
        tokens.splice(i, 2, result);
        i = 0;
      } else {
        i++;
      }
    }

    let finalExpr = tokens.join("");
    let result = Function("return " + finalExpr)();

    if (endsWithPercent) {
      result = result * 100;
    }

    display.value = parseFloat(result.toFixed(3));
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}

function deleteLastNumber() {
  display.value = display.value.slice(0, -1);
}
