namespace P2_5 {
    export interface Bild {
        link: string;
        typ: number; //Top: 0; Mitte: 1; Bottom: 2
    }
    export interface Selected {
        top: Bild;
        middle: Bild;
        bottom: Bild;
    }
    export interface AlleBilder {
        allTop: Bild[];
        allMiddle: Bild[];
        allBottom: Bild[];
    }
    let keyTop: number = 0;
    let keyMiddle: number = 1;
    let keyBottom: number = 2;
    export let allTop: Bild[] = [];
    export let allMiddle: Bild[] = [];
    export let allBottom: Bild[] = [];
    export let selected: Selected = { top: undefined, middle: undefined, bottom: undefined };
    let actSite: number = 0;

    let htmlImgs: HTMLImageElement[] = [];

    window.addEventListener("load", windowLoaded);


    async function windowLoaded(): Promise<void> {
        actSite = Number(sessionStorage.getItem("actSite"));
        getSelectedFromJSON(sessionStorage.getItem("selected"));
        await getJSONContent("data.json");

        console.log(actSite);
        if (actSite == keyTop) {
            createContent(allTop);
        } else if (actSite == keyMiddle) {
            createContent(allMiddle);
        } else if (actSite == keyBottom) {
            createContent(allBottom);
        }
    }

    export function getSelectedFromJSON(_jsonStr: string): Selected {
        console.log(_jsonStr);
        if (_jsonStr != null) {
            let json: Selected = JSON.parse(_jsonStr);
            Object.keys(json).forEach(key => {
                if (key == "top") {
                    let pic: Bild = json[key];
                    selected.top = pic;
                } else if (key == "middle") {
                    let pic: Bild = json[key];
                    selected.middle = pic;
                } else if (key == "bottom") {
                    let pic: Bild = json[key];
                    selected.bottom = pic;
                }
            });
        }
        return selected;
    }

    function selectImage(_img: HTMLImageElement, _bild: Bild): void {
        if (_bild.typ == keyTop) {
            selected.top = _bild;
        } else if (_bild.typ == keyMiddle) {
            selected.middle = _bild;
        } else if (_bild.typ == keyBottom) {
            selected.bottom = _bild;
        }
        _img.className = "selected";
        htmlImgs.forEach(pic => {
            if (pic != _img) {
                pic.classList.remove("selected");
            }
        });
        console.log(_bild.link);
    }

    let btNext: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btWeiter");
    btNext.addEventListener("click", btNextClicked);
    let btBack: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btZurueck");
    btBack.addEventListener("click", btBackClicked);



    function btNextClicked(): void {
        console.log("Next");
        actSite = Number(sessionStorage.getItem("actSite"));
        sessionStorage.setItem("selected", JSON.stringify(selected));
        console.log("Saved: " + sessionStorage.getItem("selected"));
        if (actSite < keyBottom) {
            actSite++;
            if (actSite == keyTop) {
                createContent(allTop);
            } else if (actSite == keyMiddle) {
                if (selected.top != undefined) {
                    createContent(allMiddle);
                } else {
                    actSite--;
                }
            } else if (actSite == keyBottom) {
                if (selected.middle != undefined) {
                    createContent(allBottom);
                } else {
                    actSite--;
                }
            }
            sessionStorage.setItem("actSite", actSite.toString());
        } else if (actSite == keyBottom) {
            window.open("end.html", "_self");
        }
    }

    function btBackClicked(): void {
        if (actSite > 0)
            actSite--;
        if (actSite == keyTop) {
            selected.top = undefined;
            createContent(allTop);
        } else if (actSite == keyMiddle) {
            selected.middle = undefined;
            createContent(allMiddle);
        } else if (actSite == keyBottom) {
            selected.bottom = undefined;
            createContent(allBottom);
        }
        sessionStorage.setItem("selected", JSON.stringify(selected));
        sessionStorage.setItem("actSite", actSite.toString());
        console.log("Back");
    }

    function createContent(_bilder: Bild[]): void {
        console.log(_bilder);
        let imgContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("imgContainer");
        htmlImgs = [];
        while (imgContainer.firstChild) {
            imgContainer.firstChild.remove();
        }
        _bilder.forEach(bild => {      
            let img: HTMLImageElement = document.createElement("img");
            img.src = bild.link;
            htmlImgs.push(img);
            imgContainer.appendChild(img);
            img.addEventListener("click", function (): void {
                selectImage(img, bild);
            });
        });
        showAuswahl();
    }

    function showAuswahl(): void {
        let auswahlDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("Auswahl");
        while (auswahlDiv.firstChild) {
            auswahlDiv.firstChild.remove();
        }
        if (selected.top != undefined) {
            let imgTop: HTMLImageElement = document.createElement("img");
            imgTop.src = selected.top.link;
            auswahlDiv.appendChild(imgTop);
        }
        if (selected.middle != undefined) {
            let imgMiddle: HTMLImageElement = document.createElement("img");
            imgMiddle.src = selected.middle.link;
            auswahlDiv.appendChild(imgMiddle);
        }
        if (selected.bottom != undefined) {
            let imgBottom: HTMLImageElement = document.createElement("img");
            imgBottom.src = selected.bottom.link;
            auswahlDiv.appendChild(imgBottom);
        }
    }
}