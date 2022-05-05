"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Adressen. Diese Klasse implementiert die
 * eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
 * Die Adressen werden der Einfachheit halber in einer MongoDB abgelegt.
 */
export default class TruckService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._trucks = DatabaseFactory.database.collection("trucks");
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
        let cursor = this._trucks.find({});

        return cursor.toArray();
    }

    /**
     * Speichern eines neuen LKWs.
     *
     * @param {Object} truck Zu speichernde Truckdaten
     * @return {Promise} Gespeicherte Truckdaten
     */
    async create(truck) {
        truck = truck || {};

        let newTruck = {
            brand:           truck.brand           || "",
            model:           truck.model           || "",
            type:            truck.type            || "",
            production_date: truck.production_date || "",
            status:          truck.status          || "",
        };

        let result = await this._trucks.insertOne(newtruck);
        return await this._trucks.findOne({_id: result.insertedId});
    }

    /**
     * Auslesen eines vorhandenen LKWs anhand der ID.
     *
     * @param {String} id ID des gesuchten LKWs
     * @return {Promise} Gefundene Truckdaten
     */
    async read(id) {
        let result = await this._trucks.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Aktualisierung eines LKWs, durch Überschreiben einzelner Felder
     * oder des gesamten LKW-objekts (ohne die ID).
     *
     * @param {String} id ID des gesuchten LKWs
     * @param {[type]} car Zu speichernde Truckdaten
     * @return {Promise} Gespeicherte Truckdaten oder undefined
     */
    async update(id, car) {
        let oldTruck = await this._trucks.findOne({_id: new ObjectId(id)});
        if (!oldTruck) return;

        let updateDoc = {
            $set: {},
        };

        if (truck.brand)              updateDoc.$set.brand            = truck.brand;
        if (truck.model)              updateDoc.$set.model            = truck.model;
        if (truck.type)               updateDoc.$set.type             = truck.type;
        if (truck.production_date)    updateDoc.$set.production_date  = truck.production_date;
        if (truck.status)             updateDoc.$set.status           = truck.status;

        await this._trucks.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._trucks.findOne({_id: new ObjectId(id)});
    }

    /**
     * Löschen eines LKWs anhand ihrer ID.
     *
     * @param {String} id ID des gesuchten LKWs
     * @return {Promise} Anzahl der gelöschten Datensätze
     */
    async delete(id) {
        let result = await this._trucks.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
