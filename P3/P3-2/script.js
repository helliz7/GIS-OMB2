"use strict";
var P3_2;
(function (P3_2) {
    let urlServer = "http://localhost:8100";
    // let url: string = "https://gis-example.herokuapp.com";
    let btSendJSON = document.getElementById("sendJSON");
    btSendJSON.addEventListener("click", sendDataJSON);
    async function sendDataJSON() {
        let formData = new FormData(document.forms[0]);
        let url = urlServer + "/json";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        // let html: string = await response.text();
        let json = await response.json();
        console.log(json);
    }
})(P3_2 || (P3_2 = {}));
//# sourceMappingURL=script.js.map