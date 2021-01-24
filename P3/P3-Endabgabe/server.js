"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_Endabgabe_Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_Endabgabe_Server;
(function (P_3_Endabgabe_Server) {
    let databaseName = "Registration";
    // let databaseURL: string = "mongodb://localhost:27017"; // Lokal
    let databaseURL = "mongodb+srv://testUser:testPW@cluster0.7cdws.mongodb.net/" + databaseName + "?retryWrites=true&w=majority"; // Online
    let collectionUsers;
    console.log("Starting server"); //Ausgabe von "Starting server"
    let port = Number(process.env.PORT); //port wird definiert als number
    if (!port) //falls kein port ...
        port = 8100; //dann port sei 8100
    startServer(port);
    connectToDatabase(databaseURL);
    function startServer(_port) {
        let server = Http.createServer(); // einen neuen Server "erstellen"
        server.addListener("request", handleRequest); //
        server.addListener("listening", handleListen); //
        server.listen(_port); //"server" soll "port" (also "port = 8100") zuhören
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        collectionUsers = mongoClient.db(databaseName).collection("Users");
        console.log("Database connection", collectionUsers != undefined);
    }
    function handleListen() {
        console.log("Listening"); //sobald Server gestartet gibt er "Listening" aus
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let query = url.query;
            let command = query.command;
            if (command == "insert") {
                let fname = query.fname; //mit <string> sind wir sicher, dass es ein String ist und kein String array
                let nname = query.nname;
                let email = query.email;
                let password = query.password;
                if (fname && nname && email && password) {
                    let dbUser = { fname: fname, nname: nname, email: email, password: password };
                    let answer = await storeData(dbUser);
                    _response.write(answer);
                }
                else {
                    console.log("Nicht alles übergeben");
                }
            }
            else if (command == "get") {
                let dbUsersNames = await getAllDBUsersNames();
                _response.write(JSON.stringify(dbUsersNames));
            }
            else if (command == "login") {
                let email = query.email;
                let password = query.password;
                if (email && password) {
                    let successfully = await userLogin(email, password);
                    if (successfully) {
                        _response.write("Sie sind angemeldet");
                    }
                    else {
                        _response.write("Login fehlgeschlagen.");
                    }
                }
                else {
                    console.log("Nicht alles übergeben");
                }
            }
            else {
                console.log("Wrong command");
                _response.write("Wrong command");
            }
        }
        _response.end();
    }
    async function storeData(_dbUser) {
        if (!await userExists(_dbUser.email)) {
            await collectionUsers.insertOne(_dbUser);
            return "User wurde erfolgreich hinzugefügt.";
        }
        return "Diese E-Mail-Adresse existiert bereits.";
    }
    async function getAllDBUsersNames() {
        let dbUsers;
        dbUsers = await collectionUsers.find().toArray();
        let userNames = [];
        for (let i = 0; i < dbUsers.length; i++) {
            let user = dbUsers[i];
            userNames.push(user.fname + " " + user.nname);
        }
        return userNames;
    }
    async function userExists(email) {
        let dbUser = await collectionUsers.findOne({ email: email });
        if (dbUser) {
            return true;
        }
        return false;
    }
    async function userLogin(email, password) {
        let dbUser = await collectionUsers.findOne({ email: email, password: password });
        if (dbUser) {
            return true;
        }
        return false;
    }
})(P_3_Endabgabe_Server = exports.P_3_Endabgabe_Server || (exports.P_3_Endabgabe_Server = {}));
//# sourceMappingURL=server.js.map