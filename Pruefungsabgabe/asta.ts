namespace Pruefungsabgabe {
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById("table");

    let alleProdukte: Produkt[] = [];

    showAllUsers();

    async function showAllUsers(): Promise<void> {
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

        let headerCell6: HTMLTableDataCellElement = headerRow.insertCell();
        let pHeaderCell6: HTMLParagraphElement = document.createElement("p");
        pHeaderCell6.className = "tableheader";
        pHeaderCell6.textContent = "Name";
        headerCell6.appendChild(pHeaderCell6);

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

                let cell6: HTMLTableDataCellElement = row.insertCell(5);
                let cell7: HTMLTableDataCellElement = row.insertCell(6);

                if (produkt.zustand != 0) {
                    let pCell6: HTMLParagraphElement = document.createElement("p");
                    console.log(produkt);
                    console.log(produkt.ausleihName);
                    pCell6.textContent = produkt.ausleihName;
                    cell6.appendChild(pCell6);

                    let btnChangeStatus: HTMLButtonElement = document.createElement("button");
                    if (status == 1) {
                        btnChangeStatus.textContent = "Ausgeliehen";
                        //status auf 2 geändert
                    } else if (status == 2) {
                        btnChangeStatus.textContent = "Zurückgegeben";
                        //status auf 0 geändert
                    }
                    btnChangeStatus.addEventListener("click", function (): void {
                        if (status == 1) {
                            statusAendern(produkt._id, 2);
                        } else if (status == 2) {
                            statusAendern(produkt._id, 0);
                        }
                    });


                    cell7.appendChild(btnChangeStatus);
                }

            }

        } else {
            console.log("Error");
        }
    }

    async function statusAendern(produktID: string, newStatus: number): Promise<void> {
        let produktIDs: string[] = [produktID];
        let request: RequestData;
        if (newStatus == 0) {
            request = { command: "astaStatusAendern", artikelIDs: produktIDs, status: newStatus, email: "", name: "" };
        } else {
            let produkt: Produkt = getProductFromID(produktID, alleProdukte);
            request = { command: "astaStatusAendern", artikelIDs: produktIDs, status: newStatus, email: produkt.ausleihEmail, name: produkt.ausleihName };
        }
        console.log(request);
        let answer: ResponseFromServer = await postToServer(request);
        if (answer.status != 0) {
            console.log("Fehler: " + answer.nachricht);
        }
        showAllUsers();
    }
}