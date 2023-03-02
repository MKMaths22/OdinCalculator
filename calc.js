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
    return (a/b);
}

function Operate(a,func,b)
{
switch(func) {
case('plus'):
 return Add(a,b);

 case('times'):
 return Multiply(a,b);

 case('minus'):
 return Subtract(a,b);

 case('divide'):
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

clear.addEventListener('click', () => clearClicked());

function clearClicked() 
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

times.addEventListener('click', () => funcClicked('times'));
divide.addEventListener('click', () => funcClicked('divide'));
plus.addEventListener('click', () => funcClicked('plus'));
minus.addEventListener('click', () => funcClicked('minus'));

function funcClicked(func)
{
//console.log(`firstNumber = ${firstNumber}`);
//console.log(`secondNumber = ${secondNumber}`);
//console.log(`stateOfCalc = ${stateOfCalc}`);
//console.log(`answerNumber = ${answerNumber}`);
//console.log(`operator = ${operator}`);
 
  switch(stateOfCalc)
  {
    case('answerShowing'):
      operator = func;
      firstNumber = answerNumber;
      stateOfCalc = 'needSecondNumber';
      break;
    
    case('needSecondNumber'):
      display.textContent = 'Syntax Error!';
      stateOfCalc = 'errorState';
      break;

    case('inputtingFirstNumber'):
      operator = func;
      stateOfCalc = 'needSecondNumber';
      break;

    case('inputtingSecondNumber'):
      carryOutCalc(firstNumber,operator,secondNumber);
      operator = func;
      if (stateOfCalc !== 'errorState') stateOfCalc = 'needSecondNumber';
      //if the carryOutCalc was a division by zero the errorState must be maintained
      break;
    }
}

function carryOutCalc(a,func,b) 
{
  if(func === 'divide' && b === 0) 
  {
   display.textContent = `Cannot \/ by 0!`;
   stateOfCalc = 'errorState';
   return undefined;
  }
  
  answerNumber = Operate(a,func,b);
  //need to deal with division by zero
  operator = 'none';
  //check for scope issues, hopefully this works
  answerString = answerNumber + '';
  displayString = answerString;
  display.textContent = answerString;
  secondNumber = undefined; 
  firstNumber = answerNumber;
  console.log(stateOfCalc);
  //how the stateOfCalc changes depends on whether we have pressed equals or another operator,
  //so this change is not included in this function
}

equals.addEventListener('click', () => equalsClicked());

function equalsClicked() 
{

//console.log(`firstNumber = ${firstNumber}`);
//console.log(`secondNumber = ${secondNumber}`);
//console.log(`stateOfCalc = ${stateOfCalc}`);
//console.log(`answerNumber = ${answerNumber}`);
//console.log(`operator = ${operator}`);
 
 
   switch(stateOfCalc)
   {
   case('errorState' || 'answerShowing'):
   //does nothing
   //DO THIS FOR EARLIER SWITCH STATEMENTS SO THAT ALL CASES ARE MENTIONED EVEN WHEN NOTHING HAPPENS 
   break;
   
   case('inputtingFirstNumber'):
   //commits you to the number you have keyed in so far, so it becomes an 'answer'
   answerNumber = firstNumber;
   answerString = firstString;
   stateOfCalc = 'answerShowing';
   break;
   
   case ('needSecondNumber'):
   //uses the same number again and calls firstNumber to operate on itself, e.g. 6 x = 36 behaviour
   carryOutCalc(firstNumber,operator,firstNumber);
   if (stateOfCalc !== 'errorState') stateOfCalc = 'answerShowing';
   //if division by zero was attempted, the calc must stay in errorState
   break;

   case('inputtingSecondNumber'):
   carryOutCalc(firstNumber,operator,secondNumber);
   if (stateOfCalc !== 'errorState') stateOfCalc = 'answerShowing';
   //as above, errorState must be maintained
   }

}

//point.addEventListener('click',() => pointClicked());
//Quite a bit of extra logic has to be included to let people input decimals. The code below DOES NOT WORK because the
//conversion from strings to numbers doesn't work when there are points in the strings (except at the end).
//Also we will have to keep track of whether there is a decimal point in the number already or not, etc..
//function pointClicked()
//{
//  switch(stateOfCalc)
 // {
 // case('answerShowing'):
 //   firstString = '0.';
 //   firstNumber = 0;
  //  stateOfCalc = 'inputtingFirstNumber';
  //  displayString = '0.';
  //  display.textContent = displayString;
  //  break;

//  case('inputtingFirstNumber'):
//     firstString += '.';
 //    firstNumber = +firstString;
 //    console.log(`firstNumber = ${firstNumber}`);
 //    displayString = firstString;
 //    displayNumber = firstNumber;
 //    display.textContent = displayString;
 //    break;
  
 // case('needNewNumber'):
 //   secondString = '0.';
 //   secondNumber = 0;
 //   stateOfCalc = 'inputtingSecondNumber';
  //  displayString = secondString;
  //  display.textContent = displayString;
 //   break;

//  case('inputtingSecondNumber'):
 //   secondString += '.';
 //   secondNumber = +secondString;
 //   displayString = secondString;
 //   display.textContent = displayString;
 //   break;

 // }
//}