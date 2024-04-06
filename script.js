document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const resultDisplay = document.getElementById('result'); // Reference to result display
  let expression = '';

  function updateDisplay() {
    display.value = expression;
  }

  function updateResult(result) {
    resultDisplay.value = result;
  }

  function handleOperator(operator) {
    if (operator === '×') {
      operator = '*'; 
    } else if (operator === '÷') {
      operator = '/'; 
    }

    if (expression !== '' && !isNaN(expression[expression.length - 1])) {
      if (operator === '=') {
        evaluateExpression(); 
      } else {
        expression += operator;
        updateDisplay();
      }
    }
  }

  function clearDisplay() {
    expression = '';
    updateDisplay();
    updateResult(''); // Clear result display when clearing the expression
  }

  function evaluateExpression() {
    try {
      const result = eval(expression);
      updateResult(result); // Update the result display with the evaluated result
      expression = result.toString();
      updateDisplay();
    } catch (error) {
      display.value = 'Error';
      expression = '';
    }
  }

  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function() {
      expression += this.textContent;
      updateDisplay();
    });
  });

  document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
      handleOperator(this.textContent);
    });
  });

  document.querySelector('.ac').addEventListener('click', clearDisplay);


  document.querySelector('.dot').addEventListener('click', function() {
    if (expression !== '' && !expression.includes('.') && !isNaN(expression[expression.length - 1])) {
      expression += '.';
      updateDisplay();
    }
  });

  document.querySelector('.delete').addEventListener('click', function() {
    expression = expression.slice(0, -1);
    updateDisplay();
  });
});
