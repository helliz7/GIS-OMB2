namespace P3_2 {
    let urlServer: string = "http://localhost:8100";
    // let url: string = "https://gis-example.herokuapp.com";
    let btSendJSON: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendJSON");
    btSendJSON.addEventListener("click", sendDataJSON);

    async function sendDataJSON(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = urlServer + "/json";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        // let html: string = await response.text();
        let json: JSON = await response.json();
        console.log(json);
    }
}