"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Mongo = require("mongodb");
let commandAlleArtikel = "alleArtikel";
let commandStudentReservieren = "studentReservieren";
let commandAstaStatusAendern = "astaStatusAendern";
// let statusFrei: number = 0;
// let statusReserviert: number = 1;
// let statusAusgeliehen: number = 2;
let dbArtikelCollection = null;
let dbArtikelName = "Artikel";
let databaseName = "AstaVerleih";
let dbServerUserName = "astaUser";
let dbServerPW = "astaUserPW";
// Kommentare tauschen wenn lokal oder Remote
let databaseUrlRemote = "mongodb+srv://" + dbServerUserName + ":" + dbServerPW + "@cluster0.7cdws.mongodb.net/" + databaseName + "?retryWrites=true&w=majority";
let databaseUrl = databaseUrlRemote;
// let databaseUrlLocal: string = "mongodb://localhost:27017";
// let databaseUrl: string = databaseUrlLocal;
main();
async function main() {
    console.log("Starting server AstaVerleih"); // Konsolenausgabe
    let port = Number(process.env.PORT); // Holt aktuellen Port
    if (!port)
        port = 8100; // Wenn kein Port, Port = 8100
    startServer(port);
    await connectToDatabase();
}
function startServer(_port) {
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(_port);
}
function handleListen() {
    console.log("Listening");
}
async function connectToDatabase() {
    let options = { useNewUrlParser: true, useUnifiedTopology: true }; // Vorgegeben, danach suchen
    let mongoClient = new Mongo.MongoClient(databaseUrl, options);
    await mongoClient.connect();
    dbArtikelCollection = mongoClient.db(databaseName).collection(dbArtikelName);
    console.log("Database connection", dbArtikelCollection != undefined);
}
function handleRequest(_request, _response) {
    let response;
    if (_request.method == "POST") {
        let body = "";
        _request.on("data", data => {
            body += data;
        });
        _request.on("end", async () => {
            if (dbArtikelCollection != null) {
                let requestData = JSON.parse(body);
                if (requestData.command) {
                    switch (requestData.command) {
                        case commandAlleArtikel:
                            let alleProdukte = await getAlleProdukte();
                            if (alleProdukte) {
                                response = { status: 0, produkt: alleProdukte };
                            }
                            else {
                                response = { status: -1, nachricht: "Alle Produkte holen fehlgeschlagen" };
                            }
                            break;
                        case commandStudentReservieren:
                            if (requestData.artikelIDs && requestData.email && requestData.name) {
                                requestData.status = 1;
                                if (await statusAendern(requestData)) {
                                    response = { status: 0, nachricht: "Statusänderung erfolgreich" };
                                }
                                else {
                                    response = { status: -1, nachricht: "Statusänderung fehlgeschlagen" };
                                }
                            }
                            else {
                                response = { status: -1, nachricht: "Zu wenig Parameter" };
                            }
                            break;
                        case commandAstaStatusAendern:
                            // Wieso geht das nur, wenn status zu string konvertiert wird?
                            if (requestData.artikelIDs && requestData.status.toString()) {
                                if (await statusAendern(requestData)) {
                                    response = { status: 0, nachricht: "Statusänderung erfolgreich" };
                                }
                                else {
                                    response = { status: -1, nachricht: "Statusänderung fehlgeschlagen" };
                                }
                            }
                            else {
                                response = { status: -1, nachricht: "Zu wenig Parameter" };
                            }
                            break;
                        default:
                            response = { status: -1, nachricht: "Falsches Kommando" };
                            break;
                    }
                }
                else {
                    response = { status: -1, nachricht: "Kein Kommando" };
                }
            }
            else {
                response = { status: -1, nachricht: "Datenbank nicht verbunden" };
            }
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.setHeader("content-type", "application/json");
            _response.write(JSON.stringify(response));
            _response.end(); // Antwort schliessen
        });
    }
}
async function getAlleProdukte() {
    let produkte = await dbArtikelCollection.find().toArray();
    return produkte;
}
async function statusAendern(requestData) {
    let erfolgreich = true;
    let produkteIDs = requestData.artikelIDs;
    let status = 0;
    if (requestData.status) {
        status = requestData.status;
    }
    if (requestData.status == 0) {
        for (let index = 0; index < produkteIDs.length; index++) {
            let produktId = produkteIDs[index];
            let updated = await dbArtikelCollection.findOneAndUpdate({ _id: new Mongo.ObjectID(produktId) }, { $set: { zustand: status, ausleihName: "", ausleihEmail: "" } }, { returnOriginal: false });
            if (updated.ok != 1) {
                erfolgreich = false;
                break;
            }
        }
    }
    else {
        if (requestData.email && requestData.name) {
            let name = requestData.name;
            let email = requestData.email;
            for (let index = 0; index < produkteIDs.length; index++) {
                let produktId = produkteIDs[index];
                let updated = await dbArtikelCollection.findOneAndUpdate({ _id: new Mongo.ObjectID(produktId) }, { $set: { zustand: status, ausleihName: name, ausleihEmail: email } }, { returnOriginal: false });
                if (updated.ok != 1) {
                    erfolgreich = false;
                    break;
                }
            }
        }
    }
    return erfolgreich;
}
//# sourceMappingURL=server.js.map