"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let htmlServerAnswer = document.getElementById("serverAnswer");
    let table = document.getElementById("table");
    let btBorrow = document.getElementById("btborrow");
    btBorrow.addEventListener("click", checkout);
    let alleProdukte = [];
    let ausleihe = [];
    showAllUsers();
    async function showAllUsers() {
        htmlServerAnswer.textContent = "";
        let request = { command: "alleArtikel" };
        let answer = await Pruefungsabgabe.postToServer(request);
        if (answer.status == 0) {
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
            let price = Pruefungsabgabe.warenkorbWertAusrechnen(ausleihe, alleProdukte);
            let pPriceField = document.getElementById("priceField");
            pPriceField.textContent = (price / 100) + "€";
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
                if (produkt.zustand == 0) {
                    let cell6 = row.insertCell(5);
                    let btnBorrowUnborrow = document.createElement("button");
                    if (Pruefungsabgabe.produktInAusleihe(produkt._id, ausleihe)) {
                        btnBorrowUnborrow.textContent = "Entfernen";
                        row.className = "activeTableRow";
                    }
                    else {
                        btnBorrowUnborrow.textContent = "Hinzufügen";
                        row.className = "";
                    }
                    btnBorrowUnborrow.addEventListener("click", function () {
                        if (Pruefungsabgabe.produktInAusleihe(produkt._id, ausleihe)) {
                            ausleihe.splice(ausleihe.indexOf(produkt._id), 1);
                        }
                        else {
                            ausleihe.push(produkt._id);
                        }
                        showAllUsers();
                    });
                    cell6.appendChild(btnBorrowUnborrow);
                }
            }
        }
        else {
            console.log("Error: " + answer.nachricht);
            htmlServerAnswer.textContent = "Error: " + answer.nachricht;
        }
    }
    function checkout() {
        if (ausleihe.length > 0) {
            localStorage.setItem("ausleihe", JSON.stringify(ausleihe));
            localStorage.setItem("alleProdukte", JSON.stringify(alleProdukte));
            window.location.href = "reservierung.html";
        }
        else {
            console.log("Nichts ausgewählt");
            htmlServerAnswer.textContent = "Nichts ausgewählt";
        }
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=studiAuswahl.js.map