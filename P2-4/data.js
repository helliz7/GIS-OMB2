"use strict";
var P2_4;
(function (P2_4) {
    // Top
    let top1 = { link: "assets/Top 1.png", typ: 0 };
    P2_4.allTop.push(top1);
    let top2 = { link: "assets/Top 2.png", typ: 0 };
    P2_4.allTop.push(top2);
    let top3 = { link: "assets/Top 3.png", typ: 0 };
    P2_4.allTop.push(top3);
    //Middle
    let middle1 = { link: "assets/Middle 1.png", typ: 1 };
    P2_4.allMiddle.push(middle1);
    let middle2 = { link: "assets/Middle 2.png", typ: 1 };
    P2_4.allMiddle.push(middle2);
    let middle3 = { link: "assets/middle 3.png", typ: 1 };
    P2_4.allMiddle.push(middle3);
    //Bottom
    let bottom1 = { link: "assets/Bottom 1.png", typ: 2 };
    P2_4.allBottom.push(bottom1);
    let bottom2 = { link: "assets/Bottom 2.png", typ: 2 };
    P2_4.allBottom.push(bottom2);
    let bottom3 = { link: "assets/Bottom 3.png", typ: 2 };
    P2_4.allBottom.push(bottom3);
    createPicsFromJSON(createFullJSON());
    function createFullJSON() {
        let allBilder = { allTop: P2_4.allTop, allMiddle: P2_4.allMiddle, allBottom: P2_4.allBottom };
        let JSONalle = JSON.stringify(allBilder);
        return JSONalle;
    }
    function createPicsFromJSON(jsonStr) {
        P2_4.allTop = [];
        P2_4.allMiddle = [];
        P2_4.allBottom = [];
        let json = JSON.parse(jsonStr);
        Object.keys(json).forEach(key => {
            if (key == "allTop") {
                P2_4.allTop = json[key];
            }
            else if (key == "allMiddle") {
                P2_4.allMiddle = json[key];
            }
            else if (key == "allBottom") {
                P2_4.allBottom = json[key];
            }
        });
    }
})(P2_4 || (P2_4 = {}));
//# sourceMappingURL=data.js.map