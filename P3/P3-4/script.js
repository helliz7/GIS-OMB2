"use strict";
var P3_4;
(function (P3_4) {
    let urlServer = "http://localhost:8100";
    // let url: string = "https://gis-example.herokuapp.com";
    let pAnswer = document.getElementById("serveranswer");
    let btSend = document.getElementById("send");
    btSend.addEventListener("click", sendData);
    let btGet = document.getElementById("giveback");
    btGet.addEventListener("click", getData);
    let form = document.getElementById("form");
    async function sendData() {
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        query.append("command", "insert");
        let url = urlServer + "?" + query.toString();
        let response = await fetch(url);
        let textAnswer = await response.text();
        console.log(textAnswer);
        form.reset();
    }
    async function getData() {
        let query = new URLSearchParams();
        query.append("command", "get");
        let url = urlServer + "?" + query.toString();
        let response = await fetch(url);
        let jsonAnswer = await response.json();
        pAnswer.innerText = JSON.stringify(jsonAnswer);
    }
})(P3_4 || (P3_4 = {}));
//# sourceMappingURL=script.js.map