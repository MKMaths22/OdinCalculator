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

function addOneDigit(string,digit) 
{
  if (string === '0') newString = digit;
  else
    if (string.length < 12) newString = string + digit;
    else newString = string;
  return newString;
}

one.addEventListener('click',() => {
    displayString = addOneDigit(displayString,'1');
    displayNumber = +displayString;
    display.textContent = displayString;
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
