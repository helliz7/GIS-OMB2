"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
    console.log("Starting server"); //Ausgabe von "Starting server"
    let port = Number(process.env.PORT); //port wird definiert als number
    if (!port) //falls kein port ...
        port = 8100; //dann port sei 8100
    let server = Http.createServer(); // einen neuen Server "erstellen"
    server.addListener("request", handleRequest); //
    server.addListener("listening", handleListen); //
    server.listen(port); //"server" soll "port" (also "port = 8100") zuhören
    function handleListen() {
        console.log("Listening"); //sobald Server gestartet gibt er "Listening" aus
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true);
        let query = url.query;
        if (url.pathname == "/html") { //bin ich auf html?
            for (let key in query) { //gehe alle keys durch
                let value = query[key]; //nehme für jeden key den value
                _response.write("<p>KEY: " + key + ", Value: " + value + "</p>"); //schreibe die Verbindung aus Key und Value
            }
        }
        if (url.pathname == "/json") { //oder auf json?
            _response.write(JSON.stringify(query));
        }
        _response.end();
    }
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//# sourceMappingURL=beispielserver.js.map