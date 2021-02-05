namespace Pruefungsabgabe {
    
    // let serverUrl: string = "http://localhost:8100";
    let serverUrl: string = "https://hfusose.herokuapp.com";

    export interface RequestData {
        command: string;
        artikelIDs?: string[];
        status?: number;
        name?: string;
        email?: string;
    }

    export interface ResponseFromServer {
        status: number;
        nachricht?: string;
        produkt?: Produkt[];
    }
    export interface Produkt {
        _id?: string;
        zustand: number;
        ausleihName?: string;
        ausleihEmail?: string;
        titel: string;
        kurzbeschreibung: string;
        bildUrl: string;
        gebuehr: number;
    }

    export async function postToServer(requestData: RequestData): Promise<ResponseFromServer> {
        let requestDataString: string = JSON.stringify(requestData);
        let response: Response = await fetch(serverUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: requestDataString
        });
        let responseFromServer: ResponseFromServer = await response.json();
        return responseFromServer;
    }

    export function getProductFromID(id: string, alleProdukte: Produkt[]): Produkt {
        for (let i: number = 0; i < alleProdukte.length; i++) {
            if (alleProdukte[i]._id === id) {
                return alleProdukte[i];
            }
        }
        return null;
    }

    export function produktInAusleihe(produktID: string, ausleihe: string[]): boolean {
        for (let i: number = 0; i < ausleihe.length; i++) {
            if (ausleihe[i] === produktID) {
                return true;
            }
        }
        return false;
    }

    export function warenkorbWertAusrechnen(ausleihe: string[], alleProdukte: Produkt[]): number {
        let price: number = 0;
        for (let i: number = 0; i < ausleihe.length; i++) {
            let produktID: string = ausleihe[i];
            let produkt: Produkt = getProductFromID(produktID, alleProdukte);
            if (produkt != null) {
                price = price + produkt.gebuehr;
            }
        }
        return price;
    }
}