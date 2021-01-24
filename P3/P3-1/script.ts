let formData: FormData = new FormData(document.forms[0]);
async function sendData(): Promise<void> {
    let url: string = "https://gis-example.herokuapp.com";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    await fetch(url);
}
sendData();


