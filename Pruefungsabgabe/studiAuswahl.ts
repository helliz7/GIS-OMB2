namespace Pruefungsabgabe {
    let htmlServerAnswer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("serverAnswer");
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById("table");
    let btBorrow: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btborrow");
    btBorrow.addEventListener("click", checkout);

    let alleProdukte: Produkt[] = [];
    let ausleihe: string[] = [];

    showAllUsers();

    async function showAllUsers(): Promise<void> {
        htmlServerAnswer.textContent = "";

        let request: RequestData = { command: "alleArtikel" };
        let answer: ResponseFromServer = await postToServer(request);
        if (answer.status == 0) {
            // Solange Tabelle Elemente (Kinder / Reihen hat)
            while (table.hasChildNodes()) {
                // Loesche die erste Reihe / das erste Kind
                table.removeChild(table.firstChild);
            }
            
            let headerRow: HTMLTableRowElement = table.insertRow();

            let headerCell1: HTMLTableDataCellElement = headerRow.insertCell();
            let pHeaderCell1: HTMLParagraphElement = document.createElement("p");
            pHeaderCell1.className = "tableheader";
            pHeaderCell1.textContent = "Bild";
            headerCell1.appendChild(pHeaderCell1);

            let headerCell2: HTMLTableDataCellElement = headerRow.insertCell();
            let pHeaderCell2: HTMLParagraphElement = document.createElement("p");
            pHeaderCell2.className = "tableheader";
            pHeaderCell2.textContent = "Bezeichnung";
            headerCell2.appendChild(pHeaderCell2);

            let headerCell3: HTMLTableDataCellElement = headerRow.insertCell();
            let pHeaderCell3: HTMLParagraphElement = document.createElement("p");
            pHeaderCell3.className = "tableheader";
            pHeaderCell3.textContent = "Beschreibung";
            headerCell3.appendChild(pHeaderCell3);

            let headerCell4: HTMLTableDataCellElement = headerRow.insertCell();
            let pHeaderCell4: HTMLParagraphElement = document.createElement("p");
            pHeaderCell4.className = "tableheader";
            pHeaderCell4.textContent = "Status";
            headerCell4.appendChild(pHeaderCell4);

            let headerCell5: HTMLTableDataCellElement = headerRow.insertCell();
            let pHeaderCell5: HTMLParagraphElement = document.createElement("p");
            pHeaderCell5.className = "tableheader";
            pHeaderCell5.textContent = "Gebühr";
            headerCell5.appendChild(pHeaderCell5);

            let price: number = warenkorbWertAusrechnen(ausleihe, alleProdukte);
            let pPriceField: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("priceField");
            pPriceField.textContent = (price / 100) + "€";

            alleProdukte = answer.produkt;
            for (let i: number = 0; i < alleProdukte.length; i++) {
                let produkt: Produkt = alleProdukte[i];

                let titel: string = produkt.titel;
                let description: string = produkt.kurzbeschreibung;
                let price: number = produkt.gebuehr;
                let picture: string = produkt.bildUrl;
                let pictureDes: string = produkt.titel;
                let status: number = produkt.zustand;


                let row: HTMLTableRowElement = table.insertRow();

                let cell1: HTMLTableDataCellElement = row.insertCell(0);
                let imgCell1: HTMLImageElement = document.createElement("img");
                imgCell1.src = picture;
                imgCell1.alt = pictureDes;
                imgCell1.className = "tableImg"; // Um Element zu stylen (beim Bild zum Beispiel um max-height und max-width festzulegen)
                cell1.appendChild(imgCell1);

                let cell2: HTMLTableDataCellElement = row.insertCell(1);
                let pCell2: HTMLParagraphElement = document.createElement("p");
                pCell2.textContent = titel;
                cell2.appendChild(pCell2);

                let cell3: HTMLTableDataCellElement = row.insertCell(2);
                let pCell3: HTMLParagraphElement = document.createElement("p");
                pCell3.textContent = description;
                cell3.appendChild(pCell3);

                let cell4: HTMLTableDataCellElement = row.insertCell(3);
                let pCell4: HTMLParagraphElement = document.createElement("p");
                if (status == 0) {
                    pCell4.textContent = "frei";
                    pCell4.style.color = "green";
                } else if (status == 1) {
                    pCell4.textContent = "reserviert";
                    pCell4.style.color = "yellow";
                } else if (status == 2) {
                    pCell4.textContent = "ausgeliehen";
                    pCell4.style.color = "red";
                } else {
                    pCell4.textContent = "ERROR";
                }
                cell4.appendChild(pCell4);

                let cell5: HTMLTableDataCellElement = row.insertCell(4);
                let pCell5: HTMLParagraphElement = document.createElement("p");
                pCell5.textContent = (price / 100) + "€";
                cell5.appendChild(pCell5);

                if (produkt.zustand == 0) {
                    let cell6: HTMLTableDataCellElement = row.insertCell(5);
                    let btnBorrowUnborrow: HTMLButtonElement = document.createElement("button");
                    if (produktInAusleihe(produkt._id, ausleihe)) {
                        btnBorrowUnborrow.textContent = "Entfernen";
                        row.className = "activeTableRow";
                    } else {
                        btnBorrowUnborrow.textContent = "Hinzufügen";
                        row.className = "";
                    }
                    btnBorrowUnborrow.addEventListener("click", function (): void {
                        if (produktInAusleihe(produkt._id, ausleihe)) {
                            ausleihe.splice(ausleihe.indexOf(produkt._id), 1);
                        } else {
                            ausleihe.push(produkt._id);
                        }
                        showAllUsers();
                    });
                    cell6.appendChild(btnBorrowUnborrow);
                }

            }

        } else {
            console.log("Error: " + answer.nachricht);
            htmlServerAnswer.textContent = "Error: " + answer.nachricht;
        }
    }

    function checkout(): void {
        if (ausleihe.length > 0) {
            localStorage.setItem("ausleihe", JSON.stringify(ausleihe));
            localStorage.setItem("alleProdukte", JSON.stringify(alleProdukte));
            window.location.href = "reservierung.html";
        } else {
            console.log("Nichts ausgewählt");
            htmlServerAnswer.textContent = "Nichts ausgewählt";
        }
    }
}