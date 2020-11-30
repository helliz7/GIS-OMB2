"use strict";
var P2_3;
(function (P2_3) {
    let keyTop = 0;
    let keyMiddle = 1;
    let keyBottom = 2;
    P2_3.allTop = [];
    P2_3.allMiddle = [];
    P2_3.allBottom = [];
    P2_3.selected = { top: undefined, middle: undefined, bottom: undefined };
    let htmlImgs = [];
    window.addEventListener("load", windowLoaded);
    function windowLoaded() {
        let imgContainer = document.getElementById("imgContainer");
        P2_3.allTop.forEach(bild => {
            let img = document.createElement("img");
            img.src = bild.link;
            htmlImgs.push(img);
            imgContainer.appendChild(img);
            img.addEventListener("click", function () {
                selectImage(img, bild);
            });
        });
    }
    function selectImage(img, bild) {
        if (bild.typ == keyTop) {
            P2_3.selected.top = bild;
        }
        else if (bild.typ == keyMiddle) {
            P2_3.selected.middle = bild;
        }
        else if (bild.typ == keyBottom) {
            P2_3.selected.bottom = bild;
        }
        img.className += "selected";
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
        //TODO
        console.log("Next");
    }
    function btBackClicked() {
        //TODO
        console.log("Back");
    }
})(P2_3 || (P2_3 = {}));
//# sourceMappingURL=script.js.map