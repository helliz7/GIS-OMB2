import * as Http from "http";
import * as Url from "url";

export namespace P_3_2Server {
    console.log("Starting server"); //Ausgabe von "Starting server"
    let port: number = Number(process.env.PORT);    //port wird definiert als number
    if (!port)  //falls kein port ...
        port = 8100;    //dann port sei 8100

    let server: Http.Server = Http.createServer();  // einen neuen Server "erstellen"
    server.addListener("request", handleRequest);   //
    server.addListener("listening", handleListen);  //
    server.listen(port);    //"server" soll "port" (also "port = 8100") zuhören

    function handleListen(): void {
        console.log("Listening");   //sobald Server gestartet gibt er "Listening" aus
    }
    interface Query {
        [type: string]: string | string[];
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let query: Query = url.query;

        if (url.pathname == "/html") {       //bin ich auf html?
            for (let key in query) {    //gehe alle keys durch
                let value: string | string[] = query[key];  //nehme für jeden key den value
                _response.write("<p>KEY: " + key + ", Value: " + value + "</p>"); //schreibe die Verbindung aus Key und Value
            }
        }
        if (url.pathname == "/json") {       //oder auf json?
            _response.write(JSON.stringify(query));
        }
        _response.end();
    }
}
