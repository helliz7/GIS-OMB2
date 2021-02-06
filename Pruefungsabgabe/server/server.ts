import * as Http from "http";
import * as Mongo from "mongodb";

let commandAlleArtikel: string = "alleArtikel";
let commandStudentReservieren: string = "studentReservieren";
let commandAstaStatusAendern: string = "astaStatusAendern";

// let statusFrei: number = 0;
// let statusReserviert: number = 1;
// let statusAusgeliehen: number = 2;

let dbArtikelCollection: Mongo.Collection = null;
let dbArtikelCollectionName: string = "Artikel";
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
    dbArtikelCollection = mongoClient.db(databaseName).collection(dbArtikelCollectionName);
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
    _id: string;
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
                                response = { status: 0, produkt: alleProdukte };
                            } else {
                                response = { status: -1, nachricht: "Alle Produkte holen fehlgeschlagen" };
                            }
                            break;

                        case commandStudentReservieren:
                            if (requestData.artikelIDs && requestData.email && requestData.name) {
                                requestData.status = 1;
                                if (await statusAendern(requestData)) {
                                    response = { status: 0, nachricht: "Statusänderung erfolgreich" };
                                } else {
                                    response = { status: -1, nachricht: "Statusänderung fehlgeschlagen" };
                                }
                            } else {
                                response = { status: -1, nachricht: "Zu wenig Parameter" };
                            }

                            break;

                        case commandAstaStatusAendern:
                            // Wieso geht das nur, wenn status zu string konvertiert wird?
                            if (requestData.artikelIDs && requestData.status.toString()) {
                                if (await statusAendern(requestData)) {
                                    response = { status: 0, nachricht: "Statusänderung erfolgreich" };
                                } else {
                                    response = { status: -1, nachricht: "Statusänderung fehlgeschlagen" };
                                }
                            } else {
                                response = { status: -1, nachricht: "Zu wenig Parameter" };
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
            _response.end(); // Antwort schliessen
        });
    }
}

async function getAlleProdukte(): Promise<Produkt[]> {
    let produkte: Produkt[] = await dbArtikelCollection.find().toArray();
    return produkte;
}

async function statusAendern(requestData: RequestData): Promise<boolean> {
    let erfolgreich: boolean = true;
    let produkteIDs: string[] = requestData.artikelIDs;
    let status: number = 0;
    if (requestData.status) {
        status = requestData.status;
    }
    if (requestData.status == 0) {
        for (let index: number = 0; index < produkteIDs.length; index++) {
            let produktId: string = produkteIDs[index];
            // https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#findOneAndUpdate
            let updated: Mongo.FindAndModifyWriteOpResultObject<Produkt> = await dbArtikelCollection.findOneAndUpdate(
                { _id: new Mongo.ObjectID(produktId) },
                { $set: { zustand: status, ausleihName: "", ausleihEmail: "" } },
                { returnOriginal: false }
            );
            // https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~findAndModifyWriteOpResult
            if (updated.ok != 1) {
                erfolgreich = false;
                break;
            }

        }
    } else {
        if (requestData.email && requestData.name) {
            let name: string = requestData.name;
            let email: string = requestData.email;

            for (let index: number = 0; index < produkteIDs.length; index++) {
                let produktId: string = produkteIDs[index];
                let updated: Mongo.FindAndModifyWriteOpResultObject<Produkt> = await dbArtikelCollection.findOneAndUpdate(
                    { _id: new Mongo.ObjectID(produktId) },
                    { $set: { zustand: status, ausleihName: name, ausleihEmail: email } },
                    { returnOriginal: false }
                );
                if (updated.ok != 1) {
                    erfolgreich = false;
                    break;
                }

            }
        }

    }

    return erfolgreich;
}