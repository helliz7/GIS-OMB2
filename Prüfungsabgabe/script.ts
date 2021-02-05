import * as Mongo from "mongodb";

export namespace Pruefungsabgabe {
    let serverUrl: string = ""; //TODO Heroku
    interface RequestData {
        command: string;
        artikelIDs?: string[];
        status?: number;
        name?: string;
        email?: string;
    }

    interface ResponseFromServer {
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

    export async function postToServer(requestData: RequestData): Promise<ResponseFromServer> {
        let response: Response = await fetch(serverUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(requestData)
        });
        let responseFromServer: ResponseFromServer = await response.json();
        return responseFromServer;
    }

    async function showAllUsers(): Promise<void>{
        let request: RequestData = {command: "alleArtikel"};
        let answer: ResponseFromServer = await postToServer(request);
        let alleProdukte: Produkt[] = answer.produkt;
        alleProdukte.forEach(produkt => {
            //TODO Reihe von Tabelle erzeugen und an diese anfuegen
            let titel: string = produkt.titel;
        });
    }
}