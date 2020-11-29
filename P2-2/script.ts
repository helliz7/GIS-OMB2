// // c)

// interface Student {
//     matnr: number;
//     vorname: string;
//     nachname: string;
//     fach: string;
//     fachsemester: number;
//     wohnort: string;
// }

// let s1: Student = {matnr: 12456, vorname: "Heinz", nachname: "Rostock", fach: "OMB", fachsemester: 4, wohnort: "Furtwangen im Schwarzwald"};
// let s2: Student = {matnr: 17824, vorname: "Beate", nachname: "Berlin", fach: "MIB", fachsemester: 6, wohnort: "Furtwangen im Schwarzwald"};
// let s3: Student = {matnr: 19253, vorname: "Lilli", nachname: "März", fach: "MKB", fachsemester: 2, wohnort: "Freiburg im Breisgau"};

// // Teil 3 dieser Aufgabe verstehe ich nicht
// let studierende: any[] = [s1, s2, s3];

// showInfos(s2);
// function showInfos(studierende: any): void {
//     console.log(studierende);
// }

// //Teil 5: WTF???

// //Aufgabe 2)
// // a)
// let arrayA: number[] = [1, 4, 7, -1];
// backwards(arrayA);
// function backwards(arrayA: number[]): void {
//     for (let i: number = arrayA.length; i >= 0; i--) {
//         console.log(arrayA[i]);
//     }
// }

// // b)
// let arrayB1: number[] = [1, 3, 4, 7];
// function join(arrayA: number[], arrayB1: number[]): void {
//     let joined: number[] = arrayB1.concat(arrayA);
//     console.log(joined);
// }
// join(arrayA , arrayB1);

// // c)

// let i1: number = 2;
// let i2: number = 7;

//function split(arrayB1: number[], i1: number, i2: number) {


//}

// Aufgabe 3)
// a)

let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("Canvas");
let context: CanvasRenderingContext2D = canvas.getContext("2d");

context.beginPath();
context.rect(0, 320, 500, 80);
context.fillStyle = "green";
context.fill();
context.closePath();

context.beginPath();
context.rect(0, 0, 500, 320);
context.fillStyle = "lightblue";
context.fill();
context.closePath();

context.fillStyle = "brown";
context.fillRect(340, 200, 50, 150);
// context.globalCompositeOperation = "destination-over";

context.beginPath();
context.arc(365, 155, 65, 0, 2 * Math.PI, false);
context.fillStyle = "lightgreen";
context.fill();
context.closePath();

context.fillStyle = "grey";
context.fillRect(80, 230, 150, 100);

context.beginPath();
context.fillStyle = "red";
context.moveTo(50, 240);
context.lineTo(260, 240);
context.lineTo(160, 150);
context.fill();
context.closePath();

context.lineWidth = 5;
context.strokeStyle = "black";






// b)

// interface Rechteck {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
// }
// rechteck(50, 100, 50, 100);
// function rechteck(x: number, y: number, width: number, height: number): void {
//     context.beginPath();
//     context.rect(x, y, width, height);
//     context.fillStyle = "blue";
//     context.fill();
// }


// // c)
// createrect();
// function createrect(): void {
//     context.beginPath();
//     context.rect(5, 80, 100, 70);
//     context.fill();
// }

// // d)
// drawRect(30, 300, 200, 100);
// function drawRect(x: number, y: number, width: number, height: number): void {
//     context.beginPath();
//     context.rect(x, y, width, height);
//     context.fillStyle = "yellow";
//     context.fill();
// }
// e)
