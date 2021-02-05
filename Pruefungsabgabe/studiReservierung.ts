namespace Pruefungsabgabe {

    let ausleihe: string[] = JSON.parse(localStorage.getItem("ausleihe"));
    let alleProdukte: Produkt[] = JSON.parse(localStorage.getItem("alleProdukte"));

    let btSend: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send");
    btSend.addEventListener("click", borrow);

    let pCount: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("productschoice");
    pCount.textContent = alleProdukte.length + "";
    let pSum: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("sum");
    pSum.textContent = (warenkorbWertAusrechnen(ausleihe, alleProdukte) / 100) + "€";

    async function borrow(): Promise<void> {
        let htmlVorname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
        let htmlNachname: HTMLInputElement = <HTMLInputElement>document.getElementById("nname");
        let htmlEmail: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
        let email: string = htmlEmail.value;
        let name: string = htmlVorname.value + " " + htmlNachname.value;
        if (email.length > 0 && name.length > 0) {
            if (validateEmail(email)) {
                let request: RequestData = { command: "studentReservieren", artikelIDs: ausleihe, email: email, name: name };
                let answer: ResponseFromServer = await postToServer(request);
                if (answer.status != 0) {
                    console.log("Error " + answer.nachricht);
                } else {
                    localStorage.clear();
                    window.location.href = "index.html";
                }
            } else {
                console.log("Keine Email");
            }
        } else {
            console.log("Nicht alle Felder ausgefüllt");
        }

    }

    // code von https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    function validateEmail(email: string): boolean {
        const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}