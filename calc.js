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
console.log(displayString);
let displayNumber = +displayString;
console.log(displayNumber);

let zero = document.querySelector('#zero');
let one = document.querySelector('#one');
let two = document.querySelector('#two');

function addOneDigit(string,digit) 
{
  if (string === '0') newString = digit;
  else
    if (string.length < 12) newString = string + digit;
    else newString = string;
  console.log(`newString equals ${newString}`);
  return newString;
}

one.addEventListener('click',() => {
    displayString = addOneDigit(displayString,'1');
    displayNumber = +displayString;
    console.log(displayNumber);
    display.textContent = displayString;
});

zero.addEventListener('click',() => {
    displayString = addOneDigit(displayString,'0');
    displayNumber = +displayString;
    display.textContent = displayString;
    console.log(displayNumber);

})

two.addEventListener('click',() => {
    displayString = addOneDigit(displayString,'2');
    displayNumber = +displayString;
    console.log(displayNumber);
    display.textContent = displayString;

})
