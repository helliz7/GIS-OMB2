namespace P2_4 {
    // Top
    let top1: Bild = { link: "assets/Top 1.png", typ: 0 };
    allTop.push(top1);
    let top2: Bild = { link: "assets/Top 2.png", typ: 0 };
    allTop.push(top2);
    let top3: Bild = { link: "assets/Top 3.png", typ: 0 };
    allTop.push(top3);

    //Middle
    let middle1: Bild = { link: "assets/Middle 1.png", typ: 1 };
    allMiddle.push(middle1);
    let middle2: Bild = { link: "assets/Middle 2.png", typ: 1 };
    allMiddle.push(middle2);
    let middle3: Bild = { link: "assets/middle 3.png", typ: 1 };
    allMiddle.push(middle3);

    //Bottom
    let bottom1: Bild = { link: "assets/Bottom 1.png", typ: 2 };
    allBottom.push(bottom1);
    let bottom2: Bild = { link: "assets/Bottom 2.png", typ: 2 };
    allBottom.push(bottom2);
    let bottom3: Bild = { link: "assets/Bottom 3.png", typ: 2 };
    allBottom.push(bottom3);

    createPicsFromJSON(createFullJSON());

    function createFullJSON(): string {
        let allBilder: AlleBilder = { allTop: allTop, allMiddle: allMiddle, allBottom: allBottom };
        let jsonAlle: string = JSON.stringify(allBilder);
        return jsonAlle;
    }

    function createPicsFromJSON(jsonStr: string): void {
        allTop = [];
        allMiddle = [];
        allBottom = [];
        let json: AlleBilder = JSON.parse(jsonStr);
        Object.keys(json).forEach(key => {
            if (key == "allTop") {
                allTop = json[key];
            } else if (key == "allMiddle") {
                allMiddle = json[key];
            } else if (key == "allBottom") {
                allBottom = json[key];
            }
        });
    }
}