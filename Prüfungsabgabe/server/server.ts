import * as Http from "http";
import * as Mongo from "mongodb";
import * as url from "url";

let urlAsta: string = "verwaltung.html";

let commandAlleArtikel: string = "alleArtikel";
let commandStudentReservieren: string = "studentReservieren";
let commandAstaStatusAendern: string = "astaStatusAendern";

let statusFrei: number = 0;
let statusReserviert: number = 1;
// let statusAusgeliehen: number = 2;

let dbArtikelCollection: Mongo.Collection = null;
let dbArtikelName: string = "Artikel";
let databaseName: string = "AstaVerleih";

let dbServerUserName: string = "astaUser";
let dbServerPW: string = "astaUserPW";

// Kommentare tauschen wenn lokal oder Remote
let databaseUrlRemote: string = "mongodb+srv://" + dbServerUserName + ":" + dbServerPW + "@cluster0.7cdws.mongodb.net/" + databaseName + "?retryWrites=true&w=majority";
let databaseUrl: string = databaseUrlRemote;
// let databaseUrlLocal: string = "mongodb://localhost:27017";
// let databaseUrl: string = databaseUrlLocal;

main();

async function main(): Promise<void> {
    console.log("Starting server AstaVerleih"); // Konsolenausgabe
    let port: number = Number(process.env.PORT); // Holt aktuellen Port
    if (!port)
        port = 8100; // Wenn kein Port, Port = 8100
    startServer(port);
    await connectToDatabase();
}

function startServer(_port: number): void {
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(_port);
}

function handleListen(): void {
    console.log("Listening");
}

async function connectToDatabase(): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; // Vorgegeben, danach suchen
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(databaseUrl, options);
    await mongoClient.connect();
    dbArtikelCollection = mongoClient.db(databaseName).collection(dbArtikelName);
    console.log("Database connection", dbArtikelCollection != undefined);
}

interface RequestData {
    command: string;
    artikelIDs?: string[];
    status?: number;
    name?: string;
    email?: string;
}

interface Response {
    status: number;
    nachricht?: string;
    produkt?: Produkt[];
}

interface Produkt {
    _id?: Mongo.ObjectID;
    zustand: number;
    ausleihName?: string;
    ausleihEmail?: string;
    titel: string;
    kurzbeschreibung: string;
    bildUrl: string;
    gebuehr: number;
}


function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    let response: Response;
    if (_request.method == "POST") {
        let body: string = "";
        _request.on("data", data => {
            body += data;
        });
        _request.on("end", async () => {
            if (dbArtikelCollection != null) {
                let requestData: RequestData = JSON.parse(body);
                if (requestData.command) {
                    switch (requestData.command) {
                        case commandAlleArtikel:
                            let alleProdukte: Produkt[] = await getAlleProdukte();
                            if (alleProdukte) {
                                let actUrl: string = url.parse(_request.url, true).pathname;
                                if (actUrl != urlAsta) {
                                    let updatedAlleProdukte: Produkt[];
                                    alleProdukte.forEach(produkt => {
                                        if (produkt.ausleihName && produkt.ausleihEmail) {
                                            delete produkt.ausleihName;
                                            delete produkt.ausleihEmail;
                                        }
                                        updatedAlleProdukte.push(produkt);
                                    });
                                    response = { status: 0, produkt: updatedAlleProdukte };
                                } else {
                                    response = { status: 0, produkt: alleProdukte };
                                }
                            } else {
                                response = { status: -1, nachricht: "Alle Produkte holen fehlgeschlagen" };
                            }
                            break;

                        case commandStudentReservieren:
                            if (requestData.artikelIDs && requestData.email && requestData.name) {
                                if (await statusAendern(requestData.artikelIDs, statusReserviert, requestData.name, requestData.email)) {
                                    response = { status: 0, nachricht: "Statusänderung erfolgreich" };
                                } else {
                                    response = { status: -1, nachricht: "Statusänderung fehlgeschlagen" };
                                }
                            } else {
                                response = { status: -1, nachricht: "Zu wenig Parameter" };
                            }

                            break;

                        case commandAstaStatusAendern:
                            let actUrl: string = url.parse(_request.url, true).pathname;
                            if (actUrl == urlAsta) {
                                if (requestData.artikelIDs && requestData.email && requestData.name && requestData.status) {
                                    if (await statusAendern(requestData.artikelIDs, requestData.status, requestData.name, requestData.email)) {
                                        response = { status: 0, nachricht: "Statusänderung erfolgreich" };
                                    } else {
                                        response = { status: -1, nachricht: "Statusänderung fehlgeschlagen" };
                                    }
                                } else {
                                    response = { status: -1, nachricht: "Zu wenig Parameter" };
                                }

                            } else {
                                response = { status: -1, nachricht: "Befehl von falscher Seite" };
                            }

                            break;

                        default:
                            response = { status: -1, nachricht: "Falsches Kommando" };
                            break;
                    }
                } else {
                    response = { status: -1, nachricht: "Kein Kommando" };
                }
            } else {
                response = { status: -1, nachricht: "Datenbank nicht verbunden" };
            }
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.setHeader("content-type", "application/json");
            _response.write(JSON.stringify(response));

        });
    }
}

async function getAlleProdukte(): Promise<Produkt[]> {
    let produkte: Produkt[] = await dbArtikelCollection.find().toArray();
    return produkte;
}

async function statusAendern(produkteIDs: string[], status: number, name?: string, email?: string): Promise<boolean> {
    let erfolgreich: boolean = true;
    for (let index: number = 0; index < produkteIDs.length; index++) {
        let produktId: string = produkteIDs[index];
        if (status != statusFrei) {
            if (name && email) {
                let updated: Mongo.FindAndModifyWriteOpResultObject<Produkt> = await dbArtikelCollection.findOneAndUpdate(
                    { _id: new Mongo.ObjectID(produktId) },
                    { $set: { zustand: status, ausleihName: name, ausleihEmail: email } },
                    { returnOriginal: false }
                );
                if (updated.ok != 1) {
                    erfolgreich = false;
                    break;
                }
            } else {
                erfolgreich = false;
                break;
            }
        } else {
            let updated: Mongo.FindAndModifyWriteOpResultObject<Produkt> = await dbArtikelCollection.findOneAndUpdate(
                { _id: new Mongo.ObjectID(produktId) },
                { $set: { zustand: status } },
                { returnOriginal: false }
            );
            if (updated.ok != 1) {
                erfolgreich = false;
                break;
            }
        }
    }
    return erfolgreich;
}