import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3_4Server {
    let collectionUsers: Mongo.Collection;

    console.log("Starting server"); //Ausgabe von "Starting server"
    let port: number = Number(process.env.PORT);    //port wird definiert als number
    if (!port)  //falls kein port ...
        port = 8100;    //dann port sei 8100

    let databaseURL: string = "mongodb://localhost:27017";

    startServer(port);
    connectToDatabase(databaseURL);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();  // einen neuen Server "erstellen"
        server.addListener("request", handleRequest);   //
        server.addListener("listening", handleListen);  //
        server.listen(_port);    //"server" soll "port" (also "port = 8100") zuhören
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        collectionUsers = mongoClient.db("Registration").collection("Users");
        console.log("Database connection", collectionUsers != undefined);
    }

    function handleListen(): void {
        console.log("Listening");   //sobald Server gestartet gibt er "Listening" aus
    }
    interface Query {
        [type: string]: string | string[];
    }

    interface DBUser {
        fname: string;
        nname: string;
        email: string;
        password: string;
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let query: Query = url.query;
            let command: string = <string>query.command;
            if (command == "insert") {
                let fname: string = <string>query.fname;    //mit <string> sind wir sicher, dass es ein String ist und kein String array
                let nname: string = <string>query.nname;
                let email: string = <string>query.email;
                let password: string = <string>query.password;
                if (fname && nname && email && password) {
                    let dbUser: DBUser = { fname: fname, nname: nname, email: email, password: password };
                    await storeData(dbUser);
                    let jsonString: string = JSON.stringify(url.query);
                    _response.write(jsonString);
                    _response.write(" User saved successfully");
                } else {
                    console.log("Nicht alles übergeben");
                }
            } else if (command == "get") {
                let dbUsers: DBUser[] = await getAllDBUsers();
                _response.write(JSON.stringify(dbUsers));
            } else {
                console.log("Wrong command");
            }

        }
        _response.end();
    }

    async function storeData(_dbUser: DBUser): Promise<void> {
        await collectionUsers.insertOne(_dbUser);
    }

    async function getAllDBUsers(): Promise<DBUser[]> {
        let dbUsers: DBUser[];
        dbUsers = await collectionUsers.find().toArray();
        return dbUsers;
    }
}
