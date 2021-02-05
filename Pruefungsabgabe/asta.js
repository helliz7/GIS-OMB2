"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let table = document.getElementById("table");
    let alleProdukte = [];
    showAllUsers();
    async function showAllUsers() {
        let rowCount = table.rows.length; // Wie viele Reihen gibt es
        // start bei 1 weil Header nicht geloescht werden soll
        for (let i = 1; i < rowCount; i++) {
            // Losche die Reihe
            table.deleteRow(i);
        }
        let request = { command: "alleArtikel" };
        let answer = await Pruefungsabgabe.postToServer(request);
        if (answer.status == 0) {
            alleProdukte = answer.produkt;
            for (let i = 0; i < alleProdukte.length; i++) {
                let produkt = alleProdukte[i];
                let titel = produkt.titel;
                let description = produkt.kurzbeschreibung;
                let price = produkt.gebuehr;
                let picture = produkt.bildUrl;
                let pictureDes = produkt.titel;
                let status = produkt.zustand;
                let row = table.insertRow();
                let cell1 = row.insertCell(0);
                let imgCell1 = document.createElement("img");
                imgCell1.src = picture;
                imgCell1.alt = pictureDes;
                imgCell1.className = "tableImg"; // Um Element zu stylen (beim Bild zum Beispiel um max-height und max-width festzulegen)
                cell1.appendChild(imgCell1);
                let cell2 = row.insertCell(1);
                let pCell2 = document.createElement("p");
                pCell2.textContent = titel;
                cell2.appendChild(pCell2);
                let cell3 = row.insertCell(2);
                let pCell3 = document.createElement("p");
                pCell3.textContent = description;
                cell3.appendChild(pCell3);
                let cell4 = row.insertCell(3);
                let pCell4 = document.createElement("p");
                if (status == 0) {
                    pCell4.textContent = "frei";
                    pCell4.style.color = "green";
                }
                else if (status == 1) {
                    pCell4.textContent = "reserviert";
                    pCell4.style.color = "yellow";
                }
                else if (status == 2) {
                    pCell4.textContent = "ausgeliehen";
                    pCell4.style.color = "red";
                }
                else {
                    pCell4.textContent = "ERROR";
                }
                cell4.appendChild(pCell4);
                let cell5 = row.insertCell(4);
                let pCell5 = document.createElement("p");
                pCell5.textContent = (price / 100) + "€";
                cell5.appendChild(pCell5);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);
                if (produkt.zustand != 0) {
                    let pCell6 = document.createElement("p");
                    console.log(produkt);
                    console.log(produkt.ausleihName);
                    pCell6.textContent = produkt.ausleihName;
                    cell6.appendChild(pCell6);
                    let btnChangeStatus = document.createElement("button");
                    if (status == 1) {
                        btnChangeStatus.textContent = "Ausgeliehen";
                        //status auf 2 geändert
                    }
                    else if (status == 2) {
                        btnChangeStatus.textContent = "Zurückgegeben";
                        //status auf 0 geändert
                    }
                    btnChangeStatus.addEventListener("click", function () {
                        if (status == 1) {
                            statusAendern(produkt._id, 2);
                        }
                        else if (status == 2) {
                            statusAendern(produkt._id, 0);
                        }
                    });
                    cell7.appendChild(btnChangeStatus);
                }
            }
        }
        else {
            console.log("Error");
        }
    }
    async function statusAendern(produktID, newStatus) {
        let produktIDs = [produktID];
        let request;
        if (newStatus == 0) {
            request = { command: "astaStatusAendern", artikelIDs: produktIDs, status: newStatus, email: "", name: "" };
        }
        else {
            let produkt = Pruefungsabgabe.getProductFromID(produktID, alleProdukte);
            request = { command: "astaStatusAendern", artikelIDs: produktIDs, status: newStatus, email: produkt.ausleihEmail, name: produkt.ausleihName };
        }
        console.log(request);
        let answer = await Pruefungsabgabe.postToServer(request);
        if (answer.status != 0) {
            console.log("Fehler: " + answer.nachricht);
        }
        showAllUsers();
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=asta.js.map