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
let decimalPoint = 0;
let stateOfCalc = 'answerShowing';
//possible states also include 'inputtingFirstNumber' 'needSecondNumber' 'inputtingSecondNumber' 'errorState'

function addOneDigit(string,singleDigitString) 
{
  if (string === '0') newString = singleDigitString;
  else
    if (string.length < (12 + decimalPoint)) newString = string + singleDigitString;
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
          //displayNumber = digit; adding decimal point means number formed only when string complete
          firstString = digitString;
          //firstNumber = digit; only interpret string as number when string complete
          display.textContent = digitString;
          break;
      case 'inputtingFirstNumber':
        //we were already keying in first number of a new calculation
          firstString = addOneDigit(firstString,digitString);
          displayString = firstString;
          display.textContent = firstString;
          break;
      case 'needSecondNumber':
        //we are starting keying in the second number of the calculation
          stateOfCalc = 'inputtingSecondNumber';
          displayString = digitString;
          secondString = digitString;
          display.textContent = digitString;
          break;
      case 'inputtingSecondNumber':
        //we were already keying in the second number of the calculation
          secondString = addOneDigit(secondString,digitString);
          display.textContent = secondString;
          break;
    }
}    

clear.addEventListener('click', () => clearClicked());

function clearClicked() 
{
  display.textContent = '0';
  decimalPoint = 0;
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
    { 
      if (firstString.charAt(firstString.length - 1) === '.') decimalPoint = 0;
      //if we are about to delete a decimal point we record that there will be no point afterwards.
      firstString = firstString.slice(0,-1);
      if (firstString === '') firstString = '0';
      //prevents string from being empty so Del on '3' should result in '0'
      displayString = firstString;
      display.textContent = firstString;
    }
    break;
  case 'inputtingSecondNumber':
    if (secondString.length > 0)
    { if (secondString.charAt(secondString.length - 1) === '.') decimalPoint = 0;
      //if we are about to delete a decimal point we record that there will be no point afterwards.
      secondString = secondString.slice(0,-1);
      if (secondString === '') secondString = '0';
      //as above, prevents string from being empty
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
    case 'answerShowing':
      operator = func;
      firstNumber = answerNumber;
      stateOfCalc = 'needSecondNumber';
      break;
    
    case 'needSecondNumber':
      display.textContent = 'Syntax Error!';
      stateOfCalc = 'errorState';
      break;

    case 'inputtingFirstNumber':
      operator = func;
      //Now the inputted string needs to be interpreted as a number. Javascript gets rid of trailing zeroes automatically
      firstNumber = +firstString;
      decimalPoint = 0;
      //decimalPoint resets because we have finished inputting a number
      display.textContent = firstNumber + '';
      stateOfCalc = 'needSecondNumber';
      break;

    case 'inputtingSecondNumber':
      //as above need to turn secondString into a number before doing calculation
      secondNumber = +secondString;
      decimalPoint = 0;
      //decimalPoint resets because we have finished inputting a number
      display.textContent = secondNumber + '';
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
   display.textContent = `Cannot ${divide.textContent} by 0!`;
   stateOfCalc = 'errorState';
   return undefined;
  }
  //if division by zero attempted, an error is displayed
  answerNumber = Operate(a,func,b);
  operator = 'none';
  //resetting the absence of an operator, ready for a new calculation later
  answerString = answerNumber + '';
  displayString = answerString;
  display.textContent = answerString;
  secondNumber = undefined; 
  firstNumber = answerNumber;
  //console.log(stateOfCalc);
  //how the stateOfCalc changes depends on whether we have pressed equals or another operator,
  //so this change is not included in this function
}

equals.addEventListener('click', () => equalsClicked());

function equalsClicked() 
{
   switch(stateOfCalc)
   {
   case('errorState' || 'answerShowing'):
   //does nothing
   //DO THIS FOR EARLIER SWITCH STATEMENTS SO THAT ALL CASES ARE MENTIONED EVEN WHEN NOTHING HAPPENS 
   break;
   
   case 'inputtingFirstNumber':
   //commits you to the number you have keyed in so far, so it becomes an 'answer'
   firstNumber = +firstString;
   decimalPoint = 0;
   display.textContent = firstNumber + '';
   answerNumber = firstNumber;
   stateOfCalc = 'answerShowing';
   break;
   
   case 'needSecondNumber':
   //uses the same number again and calls firstNumber to operate on itself, e.g. 6 x = 36 behaviour
   carryOutCalc(firstNumber,operator,firstNumber);
   if (stateOfCalc !== 'errorState') stateOfCalc = 'answerShowing';
   //if division by zero was attempted, the calc must stay in errorState
   break;

   case 'inputtingSecondNumber':
   secondNumber = +secondString;
   decimalPoint = 0;
   display.textContent = secondNumber + '';
   carryOutCalc(firstNumber,operator,secondNumber);
   if (stateOfCalc !== 'errorState') stateOfCalc = 'answerShowing';
   //as above, errorState must be maintained
   }

}

point.addEventListener('click',() => pointClicked());
//my approach is to treat inputted numbers as a string until they are used for calculations.
//For inputting strings, initial zeros are ignored, except for a single zero
//starting with a decimal point is equivalent to 0 first then a point (or any number of zeros before the point)
//total length of the string is limited by (12 + decimalPoint) where decimalPoint variable 
//records whether a point has already been included in the string.
//This allows to enforce rule of only one point allowed in string, otherwise Syntax Error
//If calc enters errorState because of this, must make sure that errorState is maintained at the next click
//THEN code has to interpret the string as a number ONLY when we are finished inputting that number
//so my calculator has to do that at the right stage.
function pointClicked()
{
  switch(stateOfCalc)
  {
       case 'answerShowing':
       firstString = '0.';
       stateOfCalc = 'inputtingFirstNumber';
       displayString = '0.';
       display.textContent = displayString;
       decimalPoint = 1;
       break;

       case 'inputtingFirstNumber':    
       if (decimalPoint === 1 && firstString.length < 13) 
          {stateOfCalc = 'errorState';
           display.textContent = 'Syntax Error';
          }  
       else if (firstString.length < 12)  
          {firstString += '.';
           decimalPoint = 1;
           displayString = firstString;
           display.textContent = firstString;
          }
        break;
        //no Syntax Error occurs if max length 12 has already been reached in the inputted number
        //in any case if length is at least 12, decimal point does nothing at all 
   
        case 'needSecondNumber':
        secondString = '0.';
        stateOfCalc = 'inputtingSecondNumber';
        displayString = '0.';
        display.textContent = displayString;
        decimalPoint = 1;
        break;

        case 'inputtingSecondNumber':    
       if (decimalPoint === 1 && secondString.length < 13) 
          {stateOfCalc = 'errorState';
           display.textContent = 'Syntax Error';
          }  
       else if (secondString.length < 12)  
          {secondString += '.';
           decimalPoint = 1;
           displayString = secondString;
           display.textContent = secondString;
          }
        break;
        //no Syntax Error occurs if max length 12 has already been reached in the inputted number
        //in any case if length is at least 12, decimal point does nothing at all 
    }
}