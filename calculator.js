/*
------Andriod Phone Calculator Clone made by Diamond Ali-------
*/

//Declaration of variables
const numbers = Array.from(document.querySelectorAll("[data-number]"));
let workSpace = document.querySelector("#workSpace");  
const reset = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const equalTo = document.querySelector(".equalTo");
const text = document.querySelector(".text");
const percentage = document.querySelector(".percentage");
const body = document.querySelector("body");
const decimalPoint = document.querySelector(".decimalPoint");
const darkMode = document.querySelector(".dark");
const keys = document.querySelector("#keys")
const  lightMode = document.querySelector(".light");
const whites = document.querySelectorAll(".white");
const black = document.querySelector(".black");
const confirmationMessage = document.querySelector(".confirmationMessage");
const cancel = document.querySelector(".choice .cancel");
const okay = document.querySelector(".choice .okay");
let showExpression = document.querySelector("#showExpression");
const signs = ["+", "-", "*", "÷", "."];
const numStorage = ["0","1","2","3","4","5","6","7","8","9"];
let displayValue = "0", 
expressionValue = "0", 
firstNum = "0", 
secondNum = null, 
waitingForNextNumber = false, 
firstOperator = null, 
result, 
dataOperator, 
test = false, 
clickedEqualTo = false, 
dark = true, 
showResult = false;
//operator class
class Operators{
  constructor(selector) {
    this.selector = selector;
  }
  create() {
    const newButton = document.querySelector(this.selector);
    return newButton;
  }
}
//operator array
const operators = [
  new Operators(".divide").create(),
  new Operators(".plus").create(),
  new Operators(".minus").create(),
  new Operators(".times").create()
]
//reset screen button
function clearScreen() {
  expressionValue = "0";
  displayValue = "0";
  result = "";
  firstNum = "0";
  secondNum = "0";
  waitingForNextNumber = false;
  test = false;
  increaseFontSize("4em");
  showResult = false;
  clickedEqualTo = false;
}
//increases or decreaseas font-size
function increaseFontSize(size) {
  showExpression.style.transition = "0.3s";
  showExpression.style.fontSize = `$`;
}
function controlFontSize() {
  if (expressionValue.length > 7 && expressionValue.length < 11) {
    increaseFontSize("3em")
  } else if (expressionValue.length > 10) {
    increaseFontSize("2.3em")
  } else {
    increaseFontSize("4em")
  }
}
//delete button
function backSpace() {
  displayValue.length === 1 ? displayValue = "0" : displayValue = displayValue.slice(0, displayValue.length - 1)
  expressionValue.length === 1 ? expressionValue = "0" : expressionValue = expressionValue.slice(0, expressionValue.length - 1)
  controlFontSize()
}
//activates dark mode
function turnOnDark() {
		body.style.background = "#121212";
		keys.style.background = "#252525";
		keys
		workSpace.style.background = "#121212";
		confirmationMessage.style.background = "white";
    black.style.color = "black";
    lightMode.style.display = "block";
    darkMode.style.display = "none";
    for (white of whites) {
      white.style.color = "white";
    }
}
//activates dark mode
function turnOnLight() {
		body.style.background = "#fafafa";
		keys.style.background = "white";
		workSpace.style.background = "#a1a1a1";
		confirmationMessage.style.background = "#252525";
    black.style.color = "white";
    darkMode.style.display = "block";
    lightMode.style.display = "none";
    for (white of whites) {
      white.style.color = "black";
    }
}
function animateResult() {
  showExpression.style.transition = "0.5s";
  workSpace.style.transition = "0.5s";
  showExpression.style.fontSize = "0";
  showExpression.style.marginTop = "-100px";
  setTimeout(() => {
    showExpression.style.display = "none";
  },200)
  workSpace.style.display = "block";
  workSpace.style.marginTop = "100px";
  workSpace.style.color = "white";
  workSpace.style.fontSize = "4em";
}
function reverseAnimation() {
  showExpression.style.fontSize = "4em";
  showExpression.style.marginTop = "100px";
  showExpression.style.display = "block";
  workSpace.style.marginTop = "10px";
  workSpace.style.display = "none";
  workSpace.style.color = "#a1a1a1";
  workSpace.style.fontSize = "2.5em";
}
//adds event listener to the window to updates changes at all times 
addEventListener("click", () => {
  dark ? turnOnDark() : turnOnLight();
  controlFontSize(); 
  for (let i = 0; i < displayValue.length ; i++) {
   if (displayValue.length > 1 && displayValue[0] == 0 && displayValue[1] !== ".") {
      displayValue = displayValue.slice(1);
    } 
  }
  for (let i = 0; i < expressionValue.length ; i++) {
   if (expressionValue.length > 1 && expressionValue[0] == 0 && expressionValue[1] !== "." && !signs.includes(expressionValue[1])) {
      expressionValue = expressionValue.slice(1);
    } 
  }
  showExpression.value = expressionValue;
  if (result) {
      workSpace.value = result;
  }
  showResult ? animateResult() : reverseAnimation();
})
//Adds event listener on the number and on the decimal point 
numbers.map(number => {
  number.addEventListener("click", () => {
    showResult = false;
    if (waitingForNextNumber) {
      displayValue = "";
      test = true;
    }
    clickedEqualTo ? displayValue = "" + number.getAttribute("data-number")  : displayValue += number.getAttribute("data-number");
      if (!clickedEqualTo) {
        expressionValue += number.getAttribute("data-number");
      }

    waitingForNextNumber = false;
    controlFontSize();
  })
})
decimalPoint.addEventListener("click", () => {
  if (displayValue.length != "" && displayValue.indexOf(".") == -1 && !signs.includes(expressionValue[expressionValue.length - 1])) {
      displayValue += ".";
      clickedEqualTo = false;
      controlFontSize();
  }
  if (expressionValue.length != "" && expressionValue.indexOf(".") == -1 && !signs.includes(expressionValue[expressionValue.length - 1])) {
      expressionValue += ".";
      clickedEqualTo = false;
      controlFontSize();
  } 
})
// makes updates when that dark mode icon is clicked
darkMode.addEventListener("click", () => {
  confirmationMessage.style.display = "block";
  text.innerHTML = "Turn on dark mode";
})
//makes updates when the light mode icon is clicked
lightMode.addEventListener("click", () => {
  confirmationMessage.style.display = "block";
  text.innerHTML = "Turn on light mode";
})
//prevents the change of the theme
cancel.addEventListener("click", () => {
  confirmationMessage.style.display = "none";
})
//changes the theme
okay.addEventListener("click", () => {
  dark ? dark = false : dark = true ;
  confirmationMessage.style.display = "none";
})
backspace.addEventListener("click", backSpace)
reset.addEventListener("click", clearScreen);
//makes updates when any mathematical operator is clicked
operators.map(operator => {
  operator.addEventListener("click", () => {
    showResult = false;
    controlFontSize()
     dataOperator = operator.getAttribute("data-operator"); 
     clickedEqualTo = false;
    switch (dataOperator) {
      case "+":
        if (!signs.includes(expressionValue[expressionValue.length - 1])) {
          expressionValue += "+";
        }
        break;
      case "*":
        if (!signs.includes(expressionValue[expressionValue.length - 1])) {
          expressionValue += "×";
        }
        break;
      case "/":
        if (!signs.includes(expressionValue[expressionValue.length - 1])) {
          expressionValue += "÷";
        }
        break;
      case "-":
        if (!signs.includes(expressionValue[expressionValue.length - 1])) {
          expressionValue += "-";
        }
        break;
    }
    if (test) {
      secondNum = displayValue;
      test = false;
      switch (firstOperator) {
        case "+":
          result = Number(firstNum) + Number(secondNum);
          break;
        case "-":
          result = Number(firstNum) - Number(secondNum);
          break;
        case "*":
          `${Number(firstNum) * Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) * Number(secondNum)}` :  result = `${Number(firstNum) * Number(secondNum)}`.slice(0,16);
          break;
        case "/":
          `${Number(firstNum) / Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) / Number(secondNum)}` :  result = `${Number(firstNum) / Number(secondNum)}`.slice(0,16);
          break;
      }
      displayValue = result;
      firstOperator = dataOperator;
      firstNum = result
      secondNum = null;
    } else {
      firstOperator = dataOperator;
      firstNum = displayValue;
    }
    waitingForNextNumber = true;
  })
})
percentage.addEventListener("click", () => {
  expressionValue += "%";
  firstOperator = dataOperator;
  firstNum = displayValue;
  displayValue = Number(firstNum)/100;
  showResult = false;
})
if (expressionValue.length != "") {
  equalTo.addEventListener("click", () => {
  secondNum = displayValue
  test = false;
  switch (dataOperator) {
    case "+":
      result = Number(firstNum) + Number(secondNum);
      break;
    case "-":
      result = Number(firstNum) - Number(secondNum);
      break;
    case "*":
      `${Number(firstNum) * Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) * Number(secondNum)}` :  result = `${Number(firstNum) * Number(secondNum)}`.slice(0,16)
      break;
    case "/":
      `${Number(firstNum) / Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) / Number(secondNum)}` :  result = `${Number(firstNum) / Number(secondNum)}`.slice(0,16);
      break;
  }
  clickedEqualTo = true;
  displayValue = result;
  dataOperator = "";
  secondNum = null;
  showResult = true;
  expressionValue = result;
})
}
