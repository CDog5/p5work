console.log('Loop Lesson');

// To run this, type 'node <filename>' into terminal

if (false) {
    let myData = [2, 3, 4, 5, 6]

    myData
        .map(n => n * n)
        .forEach(n => console.log(n));

    myNames = ['joe', 'callum', 'scott']

    myNames
        .map(n => n.toUpperCase())
        .map(n => 'Mr ' + n)
        .forEach(name => console.log(name));
}

// Normal old fashioned function
function calcSquare(n) {
    return n * n;
}

// Arrow function
let calcSquareArrow = n => n * n;

let myNumber = calcSquare(6);
console.log('Old Fashioned Function', myNumber);

let myNumber2 = calcSquareArrow(6);
console.log('Arrow Function', myNumber2);

let myNumbers = [1, 2, 3, 4, 5]
let mySquares = myNumbers.map(calcSquareArrow);
console.log('My Squares', mySquares);

let mySquares2 = myNumbers.map(n => n * n);
console.log('My Squares (inline)', mySquares2);

let isEven = n => (n % 2) === 0;
let myEvenNumbers = myNumbers.filter(isEven);
console.log('Even Numbers', myEvenNumbers);

let myEvenNumbers2 =  myNumbers.filter(n => (n % 2) === 0);
console.log('Even Numbers (tight)', myEvenNumbers,2);

let x = myNumbers
    .map(n => n * n)
    .filter(n => n > 10)
    
console.log("Sqaures more than 10:", x)