namespace P3_Endabgabe {
    // let urlServer: string = "http://localhost:8100";
    let urlServer: string = "https://hfusose.herokuapp.com/";
    let pAnswer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("serveranswer");
    let btSend: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send");
    btSend.addEventListener("click", sendData);

    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");

    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        query.append("command", "insert");
        let url: string = urlServer + "?" + query.toString();
        let response: Response = await fetch(url);
        let textAnswer: string = await response.text();
        console.log(textAnswer);
        pAnswer.textContent = textAnswer;
        form.reset();
    }
}