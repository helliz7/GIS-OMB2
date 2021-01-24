namespace P2_5 {

    // function createFullJSON(): string {
    //     let allBilder: AlleBilder = { allTop: allTop, allMiddle: allMiddle, allBottom: allBottom };
    //     let jsonAlle: string = JSON.stringify(allBilder);
    //     return jsonAlle;
    // }

    function createPicsFromJSON(_jsonStr: string): void {
        allTop = [];
        allMiddle = [];
        allBottom = [];
        let json: AlleBilder = JSON.parse(_jsonStr);
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

    export async function getJSONContent(_url: string): Promise<void> {
        let response: Response = await fetch(_url);
        let json: JSON = await response.json();
        createPicsFromJSON(JSON.stringify(json));
    }
}