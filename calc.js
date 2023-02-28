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

function addOneDigit(string,digit) 
{
  if (string === '0') newString = digit;
  else
    if (string.length < 12) newString = string + digit;
    else newString = string;
  return newString;
}

one.addEventListener('click',() => {
    switch(stateOfCalc) {
    case 'errorState':
        //this key should do nothing in this case
        break;
    case 'answerShowing':
        //we have started keying in the first number of a new calculation
        stateOfCalc = 'inputtingFirstNumber';
        displayString = '1';
        displayNumber = 1;
        firstString = '1';
        firstNumber = 1;
        display.textContent = '1';
        break;
    case 'inputtingFirstNumber':
        //we were already keying in first number of a new calculation
        firstString = addOneDigit(firstString,'1');
        firstNumber = +firstString;
        displayString = firstString;
        displayNumber = firstNumber;
        display.textContent = firstString;
        break;
    case 'needSecondNumber':
        //we are starting keying in the second number of the calculation
        stateOfCalc = 'inputtingSecondNumber';
        displayString = '1';
        displayNumber = 1;
        secondString = '1';
        secondNumber = 1;
        display.textContent = '1';
        break;
    case 'inputtingSecondNumber':
        //we were already keying in the second number of the calculation
        secondString = addOneDigit(secondString,'1');
        secondNumber = +secondString;
        displayNumber = secondNumber;
        display.textContent = secondString;
        break;
    }
    
});








zero.addEventListener('click',() => {
    displayString = addOneDigit(displayString,'0');
    displayNumber = +displayString;
    display.textContent = displayString;
})

two.addEventListener('click',() => {
    displayString = addOneDigit(displayString,'2');
    displayNumber = +displayString;
    display.textContent = displayString;

})
