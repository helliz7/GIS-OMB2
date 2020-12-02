"use strict";
var P2_5;
(function (P2_5) {
    window.addEventListener("load", showContent);
    function showContent() {
        sendURL("https://gis-communication.herokuapp.com");
        console.log("Show endauswahl");
        let t = sessionStorage.getItem("selected");
        P2_5.getSelectedFromJSON(t);
        console.log("selected: " + P2_5.selected);
        let endauswahl = document.getElementById("endauswahl");
        while (endauswahl.firstChild) {
            endauswahl.firstChild.remove();
        }
        let imgTop = document.createElement("img");
        imgTop.src = P2_5.selected.top.link;
        endauswahl.appendChild(imgTop);
        let imgMiddle = document.createElement("img");
        imgMiddle.src = P2_5.selected.middle.link;
        endauswahl.appendChild(imgMiddle);
        let imgBottom = document.createElement("img");
        imgBottom.src = P2_5.selected.bottom.link;
        endauswahl.appendChild(imgBottom);
    }
    async function sendURL(_url) {
        let query = new URLSearchParams(P2_5.selected);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let json = await response.json();
        let status = document.getElementById("status");
        if (json.message != undefined) {
            status.textContent = json.message;
            status.style.color = "green";
        }
        else if (json.error != undefined) {
            status.textContent = json.error;
            status.style.color = "red";
        }
    }
})(P2_5 || (P2_5 = {}));
//# sourceMappingURL=end.js.map