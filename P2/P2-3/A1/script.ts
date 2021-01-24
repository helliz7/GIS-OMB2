namespace p2_3_1 {
    let canvas: HTMLDivElement = <HTMLDivElement>document.getElementById("canvas");
    canvas.style.position = "relative";

    let sky: HTMLDivElement = document.createElement("div");
    sky.style.backgroundColor = "lightblue";
    sky.style.width = "500px";
    sky.style.height = "300px";
    canvas.appendChild(sky);

    let grass: HTMLDivElement = document.createElement("div");
    grass.style.backgroundColor = "green";
    grass.style.width = "500px";
    grass.style.height = "100px";
    grass.style.position = "absolute";
    grass.style.top = "300px";
    canvas.appendChild(grass);

    let house: HTMLDivElement = document.createElement("div");
    house.style.backgroundColor = "grey";
    house.style.width = "150px";
    house.style.height = "100px";
    house.style.position = "absolute";
    house.style.top = "220px";
    house.style.left = "50px";
    canvas.appendChild(house);

    let stem: HTMLDivElement = document.createElement("div");
    stem.style.backgroundColor = "brown";
    stem.style.width = "50px";
    stem.style.height = "150px";
    stem.style.position = "absolute";
    stem.style.top = "200px";
    stem.style.left = "350px";
    canvas.appendChild(stem);

    let leaves: HTMLDivElement = document.createElement("div");
    leaves.style.backgroundColor = "lightgreen";
    leaves.style.borderRadius = "50%";
    leaves.style.width = "130px";
    leaves.style.height = "130px";
    leaves.style.position = "absolute";
    leaves.style.top = "90px";
    leaves.style.left = "310px";
    canvas.appendChild(leaves);

    let roof: HTMLDivElement = document.createElement("div");
    roof.style.width = "0px";
    roof.style.height = "0px";
    roof.style.borderLeft = "100px solid transparent";
    roof.style.borderRight = "100px solid transparent";
    roof.style.borderBottom = "80px solid red";
    roof.style.position = "absolute";
    roof.style.top = "150px";
    roof.style.left = "25px";
    canvas.appendChild(roof);
}