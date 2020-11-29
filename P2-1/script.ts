/*
function a1(): void {
    let x: string = "Alles ";
    console.log(x);
    func1();
    console.log(x);
    func3();
    console.log(x);
    console.log("Logo!");
}

a1();

function func1(): void {
    console.log("Gute! ");
}
function func3(): void {
    console.log("klar? ");
}


function a2(): void {
    let i: number = 8;

    do {
        console.log(i);
        i = i - 1;
    } while ( i > 0);
}

a2();

let x: string = "Hallo";
console.log(x);
func4(x);
console.log(x);
func2();
func5();
console.log(x);

function func4(y: string): void {
    y = "Bla";
    console.log(y);
}

function func2(): void {
    let x: string = "Blubb";
    console.log(x);
}

function func5(): void {
    x = "Test";
} 

// multiply
let x: number = multiply(7, 3);
function multiply(e: number, d: number): number {
    return e * d; 
}
console.log(x);

// b
let n: number = max(7, 13);
function max(a: number, b: number): number {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}
console.log(n);

// c
let i: number = 1;
let z: number = 0; 
while (i < 100) {
    z = z + i;
    console.log(z);
    i++;
}

// d
for (let i: number = 0; i < 10; i++) {
    let min: number = 1;
    let max: number = 100;
    min = Math.ceil(min);
    max = Math.floor(max);
    let r: number = Math.floor(Math.random() * (max - min)) + min;
    console.log(r);
}

// e
console.log(factrorial(5));
function factrorial(n: number): number {
    let fuc: number = 1;
    for (let i: number = 1; i <= n; i++) {
        fuc = fuc * i;
    }
    return fuc;
}

// f
leapyears();
function leapyears(): void {
    let d: Date = new Date();
    let current: number = d.getFullYear();
    for (let i: number = 1900; i <= current; i++) {
        if ((i % 4) == 0 && (i % 100) != 0) {
            console.log(i);
        } else if ((i % 400) == 0) {
            console.log(i);
        }
    }
} */

//Aufgabe 6a)

for (let zeile: number = 1; zeile <= 7; zeile++) {
    let outpZeile: string = "";
    while (outpZeile.length < zeile) {
        outpZeile = outpZeile + "#";
    }
    console.log(outpZeile);
}
/*
// b

for (let i: number = 1; i <= 100; i++) {
    if ((i % 3) == 0) {
        console.log("Fizz");
    }
    if ((i % 5) == 0 && !((i % 3) == 0)) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// c

for (let i: number = 1; i <= 100; i++) {
    if ((i % 3) == 0) {
        console.log("Fizz");
    }
    if ((i % 5) == 0 && !((i % 3) == 0)) {
        console.log("Buzz");
    } else if ((i % 15) == 0) {
        console.log("FizzBuzz");
    }
    else {
        console.log(i);
    }
}

// d
*/
