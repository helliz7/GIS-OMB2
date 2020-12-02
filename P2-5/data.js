"use strict";
var P2_5;
(function (P2_5) {
    // function createFullJSON(): string {
    //     let allBilder: AlleBilder = { allTop: allTop, allMiddle: allMiddle, allBottom: allBottom };
    //     let jsonAlle: string = JSON.stringify(allBilder);
    //     return jsonAlle;
    // }
    function createPicsFromJSON(_jsonStr) {
        P2_5.allTop = [];
        P2_5.allMiddle = [];
        P2_5.allBottom = [];
        let json = JSON.parse(_jsonStr);
        Object.keys(json).forEach(key => {
            if (key == "allTop") {
                P2_5.allTop = json[key];
            }
            else if (key == "allMiddle") {
                P2_5.allMiddle = json[key];
            }
            else if (key == "allBottom") {
                P2_5.allBottom = json[key];
            }
        });
    }
    async function getJSONContent(_url) {
        let response = await fetch(_url);
        let json = await response.json();
        createPicsFromJSON(JSON.stringify(json));
    }
    P2_5.getJSONContent = getJSONContent;
})(P2_5 || (P2_5 = {}));
//# sourceMappingURL=data.js.map