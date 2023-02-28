function Add(a,b) 
{
return(a + b);
}

function Multiply(a,b)
{
    return(a*b);
}

function Subtract(a,b)
{
    return(a - b);
}

function Divide(a,b)
{
    if (b == 0) return 'Divide by Zero Error';
    return (a/b);
}

function Operate(a,func,b)
{
switch(func) {
case('Add'):
 return Add(a,b);

 case('Multiply'):
 return Multiply(a,b);

 case('Subtract'):
 return Subtract(a,b);

 case('Divide'):
 return Divide(a,b);

 default: return 'Error: Operation not recognised.'

}

}

let display = document.querySelector('.displaypara');
let displayString = display.textContent;
let displayNumber = +displayString;

let zero = document.querySelector('#zero');
let one = document.querySelector('#one');
let two = document.querySelector('#two');
let three = document.querySelector('#three');
let four = document.querySelector('#four');
let five = document.querySelector('#five');
let six = document.querySelector('#six');
let seven = document.querySelector('#seven');
let eight = document.querySelector('#eight');
let nine = document.querySelector('#nine');
let point = document.querySelector('#point');
let equals = document.querySelector('#equals');
let times = document.querySelector('#times');
let plus = document.querySelector('#plus');
let minus = document.querySelector('#minus');
let divide = document.querySelector('#divide');
let del = document.querySelector('#del');
let clear = document.querySelector('#clear');

let firstNumber = 0;
let firstString = '0';
let secondNumber;
let secondString;
let answerNumber = 0;
let answerString = '0';
let operator = 'none';
let stateOfCalc = 'answerShowing';
//possible states also include 'inputtingFirstNumber' 'needSecondNumber' 'inputtingSecondNumber' 'errorState'

function addOneDigit(string,singleDigitString) 
{
  if (string === '0') newString = singleDigitString;
  else
    if (string.length < 12) newString = string + singleDigitString;
    else newString = string;
  return newString;
}

one.addEventListener('click',() => {digitClicked(1)});
two.addEventListener('click',() => {digitClicked(2)});
three.addEventListener('click',() => {digitClicked(3)});
four.addEventListener('click',() => {digitClicked(4)});
five.addEventListener('click',() => {digitClicked(5)});
six.addEventListener('click',() => {digitClicked(6)});
seven.addEventListener('click',() => {digitClicked(7)});
eight.addEventListener('click',() => {digitClicked(8)});
nine.addEventListener('click',() => {digitClicked(9)});
zero.addEventListener('click',() => {digitClicked(0)});
    
function digitClicked(digit) 
{
   let digitString = String(digit);
   console.log(`digitString = ${digitString}`);
    switch(stateOfCalc) {
      case 'errorState':
        //this key should do nothing in this case
          break;
      case 'answerShowing':
        //we have started keying in the first number of a new calculation
          stateOfCalc = 'inputtingFirstNumber';
          displayString = digitString;
          displayNumber = digit;
          firstString = digitString;
          firstNumber = digit;
          display.textContent = digitString;
          break;
      case 'inputtingFirstNumber':
        //we were already keying in first number of a new calculation
          firstString = addOneDigit(firstString,digitString);
          firstNumber = +firstString;
          displayString = firstString;
          displayNumber = firstNumber;
          display.textContent = firstString;
          break;
      case 'needSecondNumber':
        //we are starting keying in the second number of the calculation
          stateOfCalc = 'inputtingSecondNumber';
          displayString = digitString;
          displayNumber = digit;
          secondString = digitString;
          secondNumber = digit;
          display.textContent = digitString;
          break;
      case 'inputtingSecondNumber':
        //we were already keying in the second number of the calculation
          secondString = addOneDigit(secondString,digitString);
          secondNumber = +secondString;
          displayNumber = secondNumber;
          display.textContent = secondString;
          break;
    }
}    

clear.addEventListener('click', () => restoreInitial());

function restoreInitial() 
{
  display.textContent = '0';
  firstNumber = 0;
  firstString = '0';
  secondNumber = undefined;
  secondString = undefined;
  answerNumber = 0;
  answerString = '0';
  operator = 'none';
  stateOfCalc = 'answerShowing';
}

del.addEventListener('click', () => delClicked());

function delClicked()
{
  switch(stateOfCalc) 
  {
  case 'inputtingFirstNumber':
    if (firstString.length > 0) 
    { firstString = firstString.slice(0,-1);
      if (firstString === '') firstString = '0';
      //prevents string from being empty so Del on '3' should result in '0'
      firstNumber = +firstString;
      displayNumber = firstNumber;
      displayString = firstString;
      display.textContent = firstString;
    }
    break;
  case 'inputtingSecondNumber':
    if (secondString.length > 0)
    { secondString = secondString.slice(0,-1);
      if (secondString === '') secondString = '0';
      //as above, prevents string from being empty
      secondNumber = +secondString;
      displayNumber = secondNumber;
      displayString = secondString;
      display.textContent = secondString;

    }
    break;
    //for the other three states of the calculator, the Del button does nothing
  }

}