const defaultResult = 0;
let currentResult = defaultResult;

let logEnteries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator}${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    opertion: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };

  logEnteries.push(logEntry);
  console.log(logEnteries);
}

function calculateResult(calculationType) {
  if (
    calculationType !== "ADD" &&
    calculationType !== "SUBTRACT" &&
    calculationType !== "MULTIPLY" &&
    calculationType !== "DIVIDE"
  ) {
    return;
  }
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let mathOpertaor;
  if (calculationType === "ADD") {
    currentResult += enteredNumber;
    mathOpertaor = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= enteredNumber;
    mathOpertaor = "-";
  } else if (calculationType === "MULTIPLY") {
    currentResult *= enteredNumber;
    mathOpertaor = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= enteredNumber;
    mathOpertaor = "/";
  }

  createAndWriteOutput(mathOpertaor, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
  calculateResult("ADD");
}

function subtract() {
  calculateResult("SUBTRACT");
}
function multiply() {
  calculateResult("MULTIPLY");
}

function divide() {
  calculateResult("DIVIDE");
}

// let calculationDescription = `(${defaultResult} + 10) * 3 / 2 - 1`;
//the `` are used to create a string and if we want to print out a vraiable value NYWHERE IN THE STRING WE USE THE dollar sign and curly braces to add the variable values as if we concatinated it
//this construct is called template literal
//in template literal you can add a line break just by hitting the enter key
//in normal strings using sigle or double qoutes you use the \n to create a line break
// let errorMessage= 'An error \n' +
//                   'occurred!';

// \'' => is used to output a single qoute in your string

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
