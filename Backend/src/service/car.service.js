import DatabaseFactory from "../database.js";

/**
 * Fachliche Behandlung von allem, was mit Autos zu tun hat.
 */
export default class CarService {
    constructor() {
        this._cars = DatabaseFactory.database.collection("cars");
    }

    /**
     * Autos suchen
     */
    async search(query) {
        let cursor = this._cars.find({});

        return cursor.toArray();
    }

    /**
     * Neues Auto speichern
     */
    async create(car) {
        car = car = {};

        let newCar = {
            brand:           car.brand           || "",
            model:           car.model           || "",
            type:            car.type            || "Kein Autotyp",
            production_date: car.production_date || "Kein Herstelldatum",
            status:          car.status          || "Kein Status",
        };

        let result = await this._cars.insertOne(newCar);
        return await this._cars.findOne({_id: result.insertedId});
    }

    /**
     * Einzelnes Auto anhand ihrer ID lesen
     */
    async read(id) {
        return await this._cars.findOne({_id: new ObjectId(id)});
    }

    /**
     * Einzelnes Auto aktualisieren / überschreiben
     */
    async update(id, car) {
        let oldCar = await this._cars.findOne({_id: new ObjectId(id)});
        if (!oldCar) return;

        let updateDoc = {
            $set: {
                // Felder, die geändert werden sollen
            },
        };

        if (car.brand)              updateDoc.$set.brand            = car.brand;
        if (car.model)              updateDoc.$set.model            = car.model;
        if (car.type)               updateDoc.$set.type             = car.type;
        if (car.production_date)    updateDoc.$set.production_date  = car.production_date;
        if (car.status)             updateDoc.$set.status           = car.status;

        let result = await this._cars.updateOne({_id: new ObjectId(id)}, updateDoc);
        return await this._cars.findOne({_id: new ObjectId(id)});
    }

    /**
     * Einzelnes Auto löschen
     */
    async delete(id) {
        let result = await this._cars.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
};
