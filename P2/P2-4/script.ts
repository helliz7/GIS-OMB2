namespace P2_4 {
    export interface Selected {
        top: Bild;
        middle: Bild;
        bottom: Bild;
    }
    export interface Bild {
        link: string;
        typ: number; //Top: 0; Mitte: 1; Bottom: 2
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


    function windowLoaded(): void {
        actSite = Number(sessionStorage.getItem("actSite"));
        getSelectedFromJSON(sessionStorage.getItem("selected"));
        console.log(actSite);
        if (actSite == keyTop) {
            createContent(allTop);
        } else if (actSite == keyMiddle) {
            createContent(allMiddle);
        } else if (actSite == keyBottom) {
            createContent(allBottom);
        }
    }

    export function getSelectedFromJSON(jsonStr: string): Selected {
        console.log(jsonStr);
        if (jsonStr != null) {
            let json: Selected = JSON.parse(jsonStr);
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

    function selectImage(img: HTMLImageElement, bild: Bild): void {
        if (bild.typ == keyTop) {
            selected.top = bild;
        } else if (bild.typ == keyMiddle) {
            selected.middle = bild;
        } else if (bild.typ == keyBottom) {
            selected.bottom = bild;
        }
        img.className = "selected";
        htmlImgs.forEach(pic => {
            if (pic != img) {
                pic.classList.remove("selected");
            }
        });
        console.log(bild.link);
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

    function createContent(bilder: Bild[]): void {
        let imgContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("imgContainer");
        htmlImgs = [];
        while (imgContainer.firstChild) {
            imgContainer.firstChild.remove();
        }
        bilder.forEach(bild => {
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