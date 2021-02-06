"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let serverUrl = "http://localhost:8100";
    async function postToServer(requestData) {
        let requestDataString = JSON.stringify(requestData);
        let response = await fetch(serverUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: requestDataString
        });
        let responseFromServer = await response.json();
        return responseFromServer;
    }
    Pruefungsabgabe.postToServer = postToServer;
    function getProductFromID(id, alleProdukte) {
        for (let i = 0; i < alleProdukte.length; i++) {
            if (alleProdukte[i]._id === id) {
                return alleProdukte[i];
            }
        }
        return null;
    }
    Pruefungsabgabe.getProductFromID = getProductFromID;
    function produktInAusleihe(produktID, ausleihe) {
        for (let i = 0; i < ausleihe.length; i++) {
            if (ausleihe[i] === produktID) {
                return true;
            }
        }
        return false;
    }
    Pruefungsabgabe.produktInAusleihe = produktInAusleihe;
    function warenkorbWertAusrechnen(ausleihe, alleProdukte) {
        let price = 0;
        for (let i = 0; i < ausleihe.length; i++) {
            let produktID = ausleihe[i];
            let produkt = getProductFromID(produktID, alleProdukte);
            if (produkt != null) {
                let gebuehr = produkt.gebuehr;
                price = price + gebuehr;
            }
        }
        return price;
    }
    Pruefungsabgabe.warenkorbWertAusrechnen = warenkorbWertAusrechnen;
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=export.js.map