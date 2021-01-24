namespace P2_5 {
    window.addEventListener("load", showContent);

    function showContent(): void {
        sendURL("https://gis-communication.herokuapp.com");
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

    interface ServerAntwort {
        message: string;
        error: string;
    }

    async function sendURL(_url: RequestInfo): Promise<void> {
        let query: URLSearchParams = new URLSearchParams(<any>selected);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let json: ServerAntwort = await response.json();
        let status: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("status");
        if (json.message != undefined) {
            status.textContent = json.message;
            status.style.color = "green";
        } else if (json.error != undefined) {
            status.textContent = json.error;
            status.style.color = "red";
        }
    }

}