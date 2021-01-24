"use strict";
var P3_Endabgabe;
(function (P3_Endabgabe) {
    // let urlServer: string = "http://localhost:8100";
    let urlServer = "https://hfusose.herokuapp.com/";
    let pAnswer = document.getElementById("serveranswer");
    let btGet = document.getElementById("giveback");
    btGet.addEventListener("click", getData);
    async function getData() {
        let query = new URLSearchParams();
        query.append("command", "get");
        let url = urlServer + "?" + query.toString();
        let response = await fetch(url);
        let jsonAnswer = await response.json();
        pAnswer.textContent = JSON.stringify(jsonAnswer);
    }
})(P3_Endabgabe || (P3_Endabgabe = {}));
//# sourceMappingURL=get.js.map