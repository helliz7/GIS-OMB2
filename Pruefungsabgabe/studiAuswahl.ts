namespace Pruefungsabgabe {
    let htmlServerAnswer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("serverAnswer");
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById("table");
    let btBorrow: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btborrow");
    btBorrow.addEventListener("click", checkout);

    let alleProdukte: Produkt[] = [];
    let ausleihe: string[] = [];

    showAllUsers();

    async function showAllUsers(): Promise<void> {
        let rowCount: number = table.rows.length; // Wie viele Reihen gibt es
        // start bei 1 weil Header nicht geloescht werden soll
        for (let i: number = 1; i < rowCount; i++) {
            // Losche die Reihe
            table.deleteRow(i);
        }
        htmlServerAnswer.textContent = "";
        let price: number = warenkorbWertAusrechnen(ausleihe, alleProdukte);
        let pPriceField: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("priceField");
        pPriceField.textContent = (price / 100) + "€";

        let request: RequestData = { command: "alleArtikel" };
        let answer: ResponseFromServer = await postToServer(request);
        if (answer.status == 0) {
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
                    } else {
                        btnBorrowUnborrow.textContent = "Hinzufügen";
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