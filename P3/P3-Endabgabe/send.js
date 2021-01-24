"use strict";
var P3_Endabgabe;
(function (P3_Endabgabe) {
    // let urlServer: string = "http://localhost:8100";
    let urlServer = "https://hfusose.herokuapp.com/";
    let pAnswer = document.getElementById("serveranswer");
    let btSend = document.getElementById("send");
    btSend.addEventListener("click", sendData);
    let form = document.getElementById("form");
    async function sendData() {
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        query.append("command", "insert");
        let url = urlServer + "?" + query.toString();
        let response = await fetch(url);
        let textAnswer = await response.text();
        console.log(textAnswer);
        pAnswer.textContent = textAnswer;
        form.reset();
    }
})(P3_Endabgabe || (P3_Endabgabe = {}));
//# sourceMappingURL=send.js.map