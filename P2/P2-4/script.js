"use strict";
var P2_4;
(function (P2_4) {
    let keyTop = 0;
    let keyMiddle = 1;
    let keyBottom = 2;
    P2_4.allTop = [];
    P2_4.allMiddle = [];
    P2_4.allBottom = [];
    P2_4.selected = { top: undefined, middle: undefined, bottom: undefined };
    let actSite = 0;
    let htmlImgs = [];
    window.addEventListener("load", windowLoaded);
    function windowLoaded() {
        actSite = Number(sessionStorage.getItem("actSite"));
        getSelectedFromJSON(sessionStorage.getItem("selected"));
        console.log(actSite);
        if (actSite == keyTop) {
            createContent(P2_4.allTop);
        }
        else if (actSite == keyMiddle) {
            createContent(P2_4.allMiddle);
        }
        else if (actSite == keyBottom) {
            createContent(P2_4.allBottom);
        }
    }
    function getSelectedFromJSON(jsonStr) {
        console.log(jsonStr);
        if (jsonStr != null) {
            let json = JSON.parse(jsonStr);
            Object.keys(json).forEach(key => {
                if (key == "top") {
                    let pic = json[key];
                    P2_4.selected.top = pic;
                }
                else if (key == "middle") {
                    let pic = json[key];
                    P2_4.selected.middle = pic;
                }
                else if (key == "bottom") {
                    let pic = json[key];
                    P2_4.selected.bottom = pic;
                }
            });
        }
        return P2_4.selected;
    }
    P2_4.getSelectedFromJSON = getSelectedFromJSON;
    function selectImage(img, bild) {
        if (bild.typ == keyTop) {
            P2_4.selected.top = bild;
        }
        else if (bild.typ == keyMiddle) {
            P2_4.selected.middle = bild;
        }
        else if (bild.typ == keyBottom) {
            P2_4.selected.bottom = bild;
        }
        img.className = "selected";
        htmlImgs.forEach(pic => {
            if (pic != img) {
                pic.classList.remove("selected");
            }
        });
        console.log(bild.link);
    }
    let btNext = document.getElementById("btWeiter");
    btNext.addEventListener("click", btNextClicked);
    let btBack = document.getElementById("btZurueck");
    btBack.addEventListener("click", btBackClicked);
    function btNextClicked() {
        console.log("Next");
        actSite = Number(sessionStorage.getItem("actSite"));
        sessionStorage.setItem("selected", JSON.stringify(P2_4.selected));
        console.log("Saved: " + sessionStorage.getItem("selected"));
        if (actSite < keyBottom) {
            actSite++;
            if (actSite == keyTop) {
                createContent(P2_4.allTop);
            }
            else if (actSite == keyMiddle) {
                if (P2_4.selected.top != undefined) {
                    createContent(P2_4.allMiddle);
                }
                else {
                    actSite--;
                }
            }
            else if (actSite == keyBottom) {
                if (P2_4.selected.middle != undefined) {
                    createContent(P2_4.allBottom);
                }
                else {
                    actSite--;
                }
            }
            sessionStorage.setItem("actSite", actSite.toString());
        }
        else if (actSite == keyBottom) {
            window.open("end.html", "_self");
        }
    }
    function btBackClicked() {
        if (actSite > 0)
            actSite--;
        if (actSite == keyTop) {
            P2_4.selected.top = undefined;
            createContent(P2_4.allTop);
        }
        else if (actSite == keyMiddle) {
            P2_4.selected.middle = undefined;
            createContent(P2_4.allMiddle);
        }
        else if (actSite == keyBottom) {
            P2_4.selected.bottom = undefined;
            createContent(P2_4.allBottom);
        }
        sessionStorage.setItem("selected", JSON.stringify(P2_4.selected));
        sessionStorage.setItem("actSite", actSite.toString());
        console.log("Back");
    }
    function createContent(bilder) {
        let imgContainer = document.getElementById("imgContainer");
        htmlImgs = [];
        while (imgContainer.firstChild) {
            imgContainer.firstChild.remove();
        }
        bilder.forEach(bild => {
            let img = document.createElement("img");
            img.src = bild.link;
            htmlImgs.push(img);
            imgContainer.appendChild(img);
            img.addEventListener("click", function () {
                selectImage(img, bild);
            });
        });
        showAuswahl();
    }
    function showAuswahl() {
        let auswahlDiv = document.getElementById("Auswahl");
        while (auswahlDiv.firstChild) {
            auswahlDiv.firstChild.remove();
        }
        if (P2_4.selected.top != undefined) {
            let imgTop = document.createElement("img");
            imgTop.src = P2_4.selected.top.link;
            auswahlDiv.appendChild(imgTop);
        }
        if (P2_4.selected.middle != undefined) {
            let imgMiddle = document.createElement("img");
            imgMiddle.src = P2_4.selected.middle.link;
            auswahlDiv.appendChild(imgMiddle);
        }
        if (P2_4.selected.bottom != undefined) {
            let imgBottom = document.createElement("img");
            imgBottom.src = P2_4.selected.bottom.link;
            auswahlDiv.appendChild(imgBottom);
        }
    }
})(P2_4 || (P2_4 = {}));
//# sourceMappingURL=script.js.map