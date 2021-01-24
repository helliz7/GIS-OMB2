import * as Http from "http";

export namespace P_3_1Server {
    console.log("Starting server"); //Ausgabe von Starting server
    let port: number = Number(process.env.PORT);    //
    if (!port)  //falls port ...
        port = 8100;    //dann port sei 8100

    let server: Http.Server = Http.createServer();  // einen neuen Server "erstellen"
    server.addListener("request", handleRequest);   //
    server.addListener("listening", handleListen);  //
    server.listen(port);    //

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }
}
