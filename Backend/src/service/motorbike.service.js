"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Motorbikes. Diese Klasse implementiert die
 * eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
 * Die Motorbikes werden der Einfachheit halber in einer MongoDB abgelegt.
 */
export default class MotorbikeService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._motorbikes = DatabaseFactory.database.collection("motorbikes");
    }

    /**
     * Motorbikes suchen. Unterstützt wird lediglich eine ganz einfache Suche,
     * bei der einzelne Felder auf exakte Übereinstimmung geprüft werden.
     * Zwar unterstützt MongoDB prinzipiell beliebig komplexe Suchanfragen.
     * Um das Beispiel klein zu halten, wird dies hier aber nicht unterstützt.
     *
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Motorbikes
     */
    async search(query) {
        let cursor = this._motorbikes.find({});

        return cursor.toArray();
    }

    /**
     * Speichern eines neuen Motorbikes.
     *
     * @param {Object} motorbike Zu speichernde Motorbikedaten
     * @return {Promise} Gespeicherte Motorbikedaten
     */
    async create(motorbike) {
        motorbike = motorbike || {};

        let newMotorbike = {
            brand:           motorbike.brand           || "",
            model:           motorbike.model           || "",
            type:            motorbike.type            || "",
            production_date: motorbike.production_date || "",
            status:          motorbike.status          || "",
        };

        let result = await this._motorbikes.insertOne(newMotorbike);
        return await this._motorbikes.findOne({_id: result.insertedId});
    }

    /**
     * Auslesen eines vorhandenen Motorbikes anhand der ID.
     *
     * @param {String} id ID des gesuchten Motorbikes
     * @return {Promise} Gefundene Motorbikedaten
     */
    async read(id) {
        let result = await this._motorbikes.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Aktualisierung eines Motorbikes, durch Überschreiben einzelner Felder
     * oder des gesamten Motorbikeobjekts (ohne die ID).
     *
     * @param {String} id ID des gesuchten Motorbikes
     * @param {[type]} motorbike Zu speichernde Motorbikedaten
     * @return {Promise} Gespeicherte Motorbikedaten oder undefined
     */
    async update(id, motorbike) {
        let oldCar = await this._motorbikes.findOne({_id: new ObjectId(id)});
        if (!oldCar) return;

        let updateDoc = {
            $set: {},
        };

        if (motorbike.brand)              updateDoc.$set.brand            = motorbike.brand;
        if (motorbike.model)              updateDoc.$set.model            = motorbike.model;
        if (motorbike.type)               updateDoc.$set.type             = motorbike.type;
        if (motorbike.production_date)    updateDoc.$set.production_date  = motorbike.production_date;
        if (motorbike.status)             updateDoc.$set.status           = motorbike.status;

        await this._motorbikes.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._motorbikes.findOne({_id: new ObjectId(id)});
    }

    /**
     * Löschen eines Motorbikes anhand ihrer ID.
     *
     * @param {String} id ID des gesuchten Motorbikes
     * @return {Promise} Anzahl der gelöschten Datensätze
     */
    async delete(id) {
        let result = await this._motorbikes.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
