namespace P3_Endabgabe {
    // let urlServer: string = "http://localhost:8100";
    let urlServer: string = "https://hfusose.herokuapp.com/";
    let pAnswer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("serveranswer");
    let btGet: HTMLButtonElement = <HTMLButtonElement>document.getElementById("giveback");
    btGet.addEventListener("click", getData);

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
        pAnswer.textContent = JSON.stringify(jsonAnswer);        
    }
}