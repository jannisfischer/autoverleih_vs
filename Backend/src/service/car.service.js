"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Adressen. Diese Klasse implementiert die
 * eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
 * Die Adressen werden der Einfachheit halber in einer MongoDB abgelegt.
 */
export default class CarService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._cars = DatabaseFactory.database.collection("cars");
    }

    /**
     * Adressen suchen. Unterstützt wird lediglich eine ganz einfache Suche,
     * bei der einzelne Felder auf exakte Übereinstimmung geprüft werden.
     * Zwar unterstützt MongoDB prinzipiell beliebig komplexe Suchanfragen.
     * Um das Beispiel klein zu halten, wird dies hier aber nicht unterstützt.
     *
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Adressen
     */
    async search(query) {
        let cursor = this._cars.find(query, {
            sort: {
                first_name: 1,
                last_name: 1,
            }
        });

        return cursor.toArray();
    }

    /**
     * Speichern eines neuen Autos.
     *
     * @param {Object} car Zu speichernde Autodaten
     * @return {Promise} Gespeicherte Autodaten
     */
    async create(car) {
        car = car || {};

        let newCar = {
            brand:           car.brand           || "",
            model:           car.model           || "",
            type:            car.type            || "",
            production_date: car.production_date || "",
            status:          car.status          || "",
        };

        let result = await this._cars.insertOne(newCar);
        return await this._cars.findOne({_id: result.insertedId});
    }

    /**
     * Auslesen eines vorhandenen Autos anhand der ID.
     *
     * @param {String} id ID des gesuchten Autos
     * @return {Promise} Gefundene Autodaten
     */
    async read(id) {
        let result = await this._cars.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Aktualisierung eines Autos, durch Überschreiben einzelner Felder
     * oder des gesamten Autoobjekts (ohne die ID).
     *
     * @param {String} id ID des gesuchten Autos
     * @param {[type]} car Zu speichernde Autodaten
     * @return {Promise} Gespeicherte Autodaten oder undefined
     */
    async update(id, car) {
        let oldCar = await this._cars.findOne({_id: new ObjectId(id)});
        if (!oldCar) return;

        let updateDoc = {
            $set: {},
        }

        if (car.brand)              updateDoc.$set.brand            = car.brand;
        if (car.model)              updateDoc.$set.model            = car.model;
        if (car.type)               updateDoc.$set.type             = car.type;
        if (car.production_date)    updateDoc.$set.production_date  = car.production_date;
        if (car.status)             updateDoc.$set.status           = car.status;

        await this._cars.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._cars.findOne({_id: new ObjectId(id)});
    }

    /**
     * Löschen eines Autos anhand ihrer ID.
     *
     * @param {String} id ID des gesuchten Autos
     * @return {Promise} Anzahl der gelöschten Datensätze
     */
    async delete(id) {
        let result = await this._cars.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
