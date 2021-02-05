"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let ausleihe = JSON.parse(localStorage.getItem("ausleihe"));
    let alleProdukte = JSON.parse(localStorage.getItem("alleProdukte"));
    let btSend = document.getElementById("send");
    btSend.addEventListener("click", borrow);
    let pCount = document.getElementById("productschoice");
    pCount.textContent = alleProdukte.length + "";
    let pSum = document.getElementById("sum");
    pSum.textContent = (Pruefungsabgabe.warenkorbWertAusrechnen(ausleihe, alleProdukte) / 100) + "€";
    async function borrow() {
        let htmlVorname = document.getElementById("fname");
        let htmlNachname = document.getElementById("nname");
        let htmlEmail = document.getElementById("email");
        let email = htmlEmail.value;
        let name = htmlVorname.value + " " + htmlNachname.value;
        if (email.length > 0 && name.length > 0) {
            if (validateEmail(email)) {
                let request = { command: "studentReservieren", artikelIDs: ausleihe, email: email, name: name };
                let answer = await Pruefungsabgabe.postToServer(request);
                if (answer.status != 0) {
                    console.log("Error " + answer.nachricht);
                }
                else {
                    localStorage.clear();
                    window.location.href = "index.html";
                }
            }
            else {
                console.log("Keine Email");
            }
        }
        else {
            console.log("Nicht alle Felder ausgefüllt");
        }
    }
    // code von https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=studiReservierung.js.map