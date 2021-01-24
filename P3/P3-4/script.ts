namespace P3_4 {
    let urlServer: string = "http://localhost:8100";
    // let url: string = "https://gis-example.herokuapp.com";
    let pAnswer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("serveranswer");
    let btSend: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send");
    btSend.addEventListener("click", sendData);
    let btGet: HTMLButtonElement = <HTMLButtonElement>document.getElementById("giveback");
    btGet.addEventListener("click", getData);
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById("form");

    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        query.append("command", "insert");
        let url: string = urlServer + "?" + query.toString();
        let response: Response = await fetch(url);
        let textAnswer: string = await response.text();
        console.log(textAnswer);
        form.reset();
    }
    interface DBUser {
        fname: string;
        nname: string;
        email: string;
        password: string;
    }
    async function getData(): Promise<void> {   //asynchrone Funktionen immer Promise
        let query: URLSearchParams = new URLSearchParams();
        query.append("command", "get");
        let url: string = urlServer + "?" + query.toString();
        let response: Response = await fetch(url);
        let jsonAnswer: DBUser = await response.json();
        pAnswer.innerText = JSON.stringify(jsonAnswer);        
    }
}