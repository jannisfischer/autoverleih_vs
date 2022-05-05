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

        let trucks = this.database.collection("trucks");

        if (await trucks.estimatedDocumentCount() === 0) {
            trucks.insertMany([
                {
                    brand: "Mercedes",
                    model: "Atego",
                    type: "N2",
                    production_date: "01.04.2015",
                    status: "available",
                },
                {
                    brand: "MAN",
                    model: "TGX",
                    type: "N3",
                    production_date: "15.02.2021",
                    status: "rented",
                },
                {
                    brand: "MAN",
                    model: "TGL",
                    type: "N2",
                    production_date: "24.04.2011",
                    status: "available",
                },
            ]);
        }

        let motorbikes = this.database.collection("motorbikes");

        if (await motorbikes.estimatedDocumentCount() === 0) {
            motorbikes.insertMany([
                {
                    brand: "Suzuki",
                    model: "Hayabusa",
                    type: "Sportbike",
                    production_date: "22.03.2019",
                    status: "available",
                },
                {
                    brand: "KTM",
                    model: "150 EXC",
                    type: "Enduro",
                    production_date: "12.01.2022",
                    status: "available",
                },
                {
                    brand: "Honda",
                    model: "ST1300 Pan European",
                    type: "Tourer",
                    production_date: "19.04.2003",
                    status: "available",
                },
            ]);
        }

        let bicycles = this.database.collection("bicycles");

        if (await bicycles.estimatedDocumentCount() === 0) {
            bicycles.insertMany([
                {
                    brand: "Serious",
                    model: "Rockville",
                    type: "Mountainbike",
                    size: "27.5",
                    production_date: "20.06.2010",
                    status: "available",
                },
                {
                    brand: "Focus",
                    model: "Whistler 3.6",
                    type: "Mountainbike",
                    size: "29",
                    production_date: "24.10.2017",
                    status: "available",
                },
                {
                    brand: "Vermont",
                    model: "Kinara",
                    type: "Trekkingrad",
                    size: "28",
                    production_date: "03.12.2019",
                    status: "available",
                },
            ]);
        }
    }
}

export default new DatabaseFactory();
