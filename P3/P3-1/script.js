"use strict";
let formData = new FormData(document.forms[0]);
async function sendData() {
    let url = "https://gis-example.herokuapp.com";
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    await fetch(url);
}
sendData();
//# sourceMappingURL=script.js.map