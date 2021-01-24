"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_4Server;
(function (P_3_4Server) {
    let collectionUsers;
    console.log("Starting server"); //Ausgabe von "Starting server"
    let port = Number(process.env.PORT); //port wird definiert als number
    if (!port) //falls kein port ...
        port = 8100; //dann port sei 8100
    let databaseURL = "mongodb://localhost:27017";
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
        collectionUsers = mongoClient.db("Registration").collection("Users");
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
                    await storeData(dbUser);
                    let jsonString = JSON.stringify(url.query);
                    _response.write(jsonString);
                    _response.write(" User saved successfully");
                }
                else {
                    console.log("Nicht alles übergeben");
                }
            }
            else if (command == "get") {
                let dbUsers = await getAllDBUsers();
                _response.write(JSON.stringify(dbUsers));
            }
            else {
                console.log("Wrong command");
            }
        }
        _response.end();
    }
    async function storeData(_dbUser) {
        await collectionUsers.insertOne(_dbUser);
    }
    async function getAllDBUsers() {
        let dbUsers;
        dbUsers = await collectionUsers.find().toArray();
        return dbUsers;
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=server.js.map