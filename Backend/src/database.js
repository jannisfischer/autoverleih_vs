"use strict"

import { MongoClient } from "mongodb";

/**
 * Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses
 * ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann
 * einfach das Singleton-Objekt dieser Klasse importiert und das Attribut
 * `mongodb` oder `database` ausgelesen werden.
 */
class DatabaseFactory {
    /**
     * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
     * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
     * auch gleich die Verbindung hergestellt.
     *
     * @param {String} connectionUrl URL-String mit den Verbindungsdaten
     */
    async init(connectionUrl) {
        // Datenbankverbindung herstellen
        this.client = new MongoClient(connectionUrl);
        await this.client.connect();
        this.database = this.client.db("rental");

        await this._createDemoData();
    }

    /**
     * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */
    async _createDemoData() {
        let cars = this.database.collection("cars");

        if (await cars.estimatedDocumentCount() === 0) {
            cars.insertMany([
                {
                    brand: "Volkswagen",
                    model: "Touran",
                    type: "Van",
                    production_date: "01.07.2021",
                    status: "available",
                },
                {
                    brand: "Audi",
                    model: "Q5",
                    type: "SUV",
                    production_date: "01.05.2020",
                    status: "available",
                },
                {
                    brand: "Seat",
                    model: "Alhambra",
                    type: "Van",
                    production_date: "01.04.2019",
                    status: "rented",
                },
            ]);
        }
    }
}

export default new DatabaseFactory();
