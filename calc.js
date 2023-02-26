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

console.log(Operate(3,'Divide',0));
console.log(Operate(2,'Multiply',3));
console.log(Operate(3,'Subtract',-4));
console.log(Operate(2, 'Add', 999));