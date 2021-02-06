"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let table = document.getElementById("table");
    let alleProdukte = [];
    showAllUsers();
    async function showAllUsers() {
        // Solange Tabelle Elemente (Kinder / Reihen hat)
        while (table.hasChildNodes()) {
            // Loesche die erste Reihe / das erste Kind
            table.removeChild(table.firstChild);
        }
        let headerRow = table.insertRow();
        let headerCell1 = headerRow.insertCell();
        let pHeaderCell1 = document.createElement("p");
        pHeaderCell1.className = "tableheader";
        pHeaderCell1.textContent = "Bild";
        headerCell1.appendChild(pHeaderCell1);
        let headerCell2 = headerRow.insertCell();
        let pHeaderCell2 = document.createElement("p");
        pHeaderCell2.className = "tableheader";
        pHeaderCell2.textContent = "Bezeichnung";
        headerCell2.appendChild(pHeaderCell2);
        let headerCell3 = headerRow.insertCell();
        let pHeaderCell3 = document.createElement("p");
        pHeaderCell3.className = "tableheader";
        pHeaderCell3.textContent = "Beschreibung";
        headerCell3.appendChild(pHeaderCell3);
        let headerCell4 = headerRow.insertCell();
        let pHeaderCell4 = document.createElement("p");
        pHeaderCell4.className = "tableheader";
        pHeaderCell4.textContent = "Status";
        headerCell4.appendChild(pHeaderCell4);
        let headerCell5 = headerRow.insertCell();
        let pHeaderCell5 = document.createElement("p");
        pHeaderCell5.className = "tableheader";
        pHeaderCell5.textContent = "Gebühr";
        headerCell5.appendChild(pHeaderCell5);
        let headerCell6 = headerRow.insertCell();
        let pHeaderCell6 = document.createElement("p");
        pHeaderCell6.className = "tableheader";
        pHeaderCell6.textContent = "Name";
        headerCell6.appendChild(pHeaderCell6);
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