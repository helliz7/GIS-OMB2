namespace P2_4 {
    window.addEventListener("load", showContent);

    function showContent(): void {
        console.log("Show endauswahl");
        let t: string = sessionStorage.getItem("selected");
        getSelectedFromJSON(t);
        console.log("selected: " + selected);
        let endauswahl: HTMLDivElement = <HTMLDivElement>document.getElementById("endauswahl");
        while (endauswahl.firstChild) {
            endauswahl.firstChild.remove();
        }

        let imgTop: HTMLImageElement = document.createElement("img");
        imgTop.src = selected.top.link;
        endauswahl.appendChild(imgTop);
        let imgMiddle: HTMLImageElement = document.createElement("img");
        imgMiddle.src = selected.middle.link;
        endauswahl.appendChild(imgMiddle);
        let imgBottom: HTMLImageElement = document.createElement("img");
        imgBottom.src = selected.bottom.link;
        endauswahl.appendChild(imgBottom);

    }
}