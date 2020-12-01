"use strict";
var P2_4;
(function (P2_4) {
    window.addEventListener("load", showContent);
    function showContent() {
        console.log("Show endauswahl");
        let t = sessionStorage.getItem("selected");
        P2_4.getSelectedFromJSON(t);
        console.log("selected: " + P2_4.selected);
        let endauswahl = document.getElementById("endauswahl");
        while (endauswahl.firstChild) {
            endauswahl.firstChild.remove();
        }
        let imgTop = document.createElement("img");
        imgTop.src = P2_4.selected.top.link;
        endauswahl.appendChild(imgTop);
        let imgMiddle = document.createElement("img");
        imgMiddle.src = P2_4.selected.middle.link;
        endauswahl.appendChild(imgMiddle);
        let imgBottom = document.createElement("img");
        imgBottom.src = P2_4.selected.bottom.link;
        endauswahl.appendChild(imgBottom);
    }
})(P2_4 || (P2_4 = {}));
//# sourceMappingURL=end.js.map