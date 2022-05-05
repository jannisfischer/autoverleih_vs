"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Fahrrädern. Diese Klasse implementiert die
 * eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
 * Die Adressen werden der Einfachheit halber in einer MongoDB abgelegt.
 */
export default class BicycleService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._bicycles = DatabaseFactory.database.collection("trucks");
    }

    /**
     * Fahrräder suchen. Unterstützt wird lediglich eine ganz einfache Suche,
     * bei der einzelne Felder auf exakte Übereinstimmung geprüft werden.
     * Zwar unterstützt MongoDB prinzipiell beliebig komplexe Suchanfragen.
     * Um das Beispiel klein zu halten, wird dies hier aber nicht unterstützt.
     *
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Adressen
     */
    async search(query) {
        let cursor = this._bicycles.find({});

        return cursor.toArray();
    }

    /**
     * Speichern eines neuen Fahrräder.
     *
     * @param {Object} bicycle Zu speichernde Fahrraddaten
     * @return {Promise} Gespeicherte Fahrraddaten
     */
    async create(bicycle) {
        bicycle = bicycle || {};

        let newBicycle = {
            brand:           bicycle.brand           || "",
            model:           bicycle.model           || "",
            type:            bicycle.type            || "",
            size:            bicycle.size            || "",
            production_date: bicycle.production_date || "",
            status:          bicycle.status          || "",
        };

        let result = await this._bicycles.insertOne(newBicycle);
        return await this._bicycles.findOne({_id: result.insertedId});
    }

    /**
     * Auslesen eines vorhandenen Fahrrädern anhand der ID.
     *
     * @param {String} id ID des gesuchten Fahrrädern
     * @return {Promise} Gefundene Fahrräderdaten
     */
    async read(id) {
        let result = await this._bicycles.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Aktualisierung eines Fahrrads, durch Überschreiben einzelner Felder
     * oder des gesamten Fahrrad-objekts (ohne die ID).
     *
     * @param {String} id ID des gesuchten Fahrrädern
     * @param {[type]} car Zu speichernde Fahrräderdaten
     * @return {Promise} Gespeicherte Fahrräderdaten oder undefined
     */
    async update(id, bicycle) {
        let oldBicycle = await this._bicycles.findOne({_id: new ObjectId(id)});
        if (!oldBicycle) return;

        let updateDoc = {
            $set: {},
        };

        if (bicycle.brand)              updateDoc.$set.brand            = bicycle.brand;
        if (bicycle.model)              updateDoc.$set.model            = bicycle.model;
        if (bicycle.type)               updateDoc.$set.type             = bicycle.type;
        if (bicycle.size)               updateDoc.$set.size             = bicycle.size;
        if (bicycle.production_date)    updateDoc.$set.production_date  = bicycle.production_date;
        if (bicycle.status)             updateDoc.$set.status           = bicycle.status;

        await this._bicycles.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._bicycles.findOne({_id: new ObjectId(id)});
    }

    /**
     * Löschen eines Fahrrad anhand ihrer ID.
     *
     * @param {String} id ID des gesuchten Fahrrads
     * @return {Promise} Anzahl der gelöschten Datensätze
     */
    async delete(id) {
        let result = await this._bicycles.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
