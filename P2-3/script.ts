namespace P2_3 {
    export interface Selected {
        top: Bild;
        middle: Bild;
        bottom: Bild;
    }
    export interface Bild {
        link: string;
        typ: number; //Top: 0; Mitte: 1; Bottom: 2
    }
    let keyTop: number = 0;
    let keyMiddle: number = 1;
    let keyBottom: number = 2;
    export let allTop: Bild[] = [];
    export let allMiddle: Bild[] = [];
    export let allBottom: Bild[] = [];
    export let selected: Selected = { top: undefined, middle: undefined, bottom: undefined };

    let htmlImgs: HTMLImageElement[] = [];

    window.addEventListener("load", windowLoaded);


    function windowLoaded(): void {
        let imgContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("imgContainer");
        allTop.forEach(bild => {
            let img: HTMLImageElement = document.createElement("img");
            img.src = bild.link;
            htmlImgs.push(img);
            imgContainer.appendChild(img);
            img.addEventListener("click", function (): void {
                selectImage(img, bild);
            });
        });
    }

    function selectImage(img: HTMLImageElement, bild: Bild): void {
        if (bild.typ == keyTop) {
            selected.top = bild;
        } else if (bild.typ == keyMiddle) {
            selected.middle = bild;
        } else if (bild.typ == keyBottom) {
            selected.bottom = bild;
        }
        img.className += "selected";
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
        //TODO
        console.log("Next");
    }

    function btBackClicked(): void {
        //TODO
        console.log("Back");
    }
}