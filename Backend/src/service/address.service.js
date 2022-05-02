import DatabaseFactory "../database.js";

/**
 * Fachliche Behandlung von allem, was mit Adressen zu tun hat.
 */
export default class AddressService {
    constructor() {
        this._addresses = DatabaseFactory.database.collection("addresses");
    }

    /**
     * Adressen suchen
     */
    async search(query) {
        let cursor = this._addresses.find(query, {
            sort: {
                first_name: 1,
                last_name: 1,
            }
        });

        return cursor.toArray();
    }

    /**
     * Neue Adresse speichern
     */
    async create(address) {
        address = address = {};

        let newAddress = {
            first_name: address.first_name || "",
            last_name:  address.last_name  || "",
            phone:      address.phone      || "Keine Telefonnummer",
            email:      address.email      || "Keine E-Mail",
        };

        let result = await this._addresses.insertOne(newAddress);
        return await this._addresses.findOne({_id: result.insertedId});
    }

    /**
     * Einzelne Adresse anhand ihrer ID lesen
     */
    async read(id) {
        return await this._addresses.findOne({_id: new ObjectId(id)});
    }

    /**
     * Einzelne Adresse aktualisieren / überschreiben
     */
    async update(id, address) {
        let oldAddress = await this._addresses.findOne({_id: new ObjectId(id)});
        if (!oldAddress) return;

        let updateDoc = {
            $set: {
                // Felder, die geändert werden sollen
            },
        };

        if (address.first_name) updateDoc.$set.first_name = address.first_name;
        if (address.last_name)  updateDoc.$set.last_name  = address.last_name;
        if (address.phone)      updateDoc.$set.phone      = address.phone;
        if (address.email)      updateDoc.$set.email      = address.email;

        let result = await this._addresses.updateOne({_id: new ObjectId(id)}, updateDoc);
        return await this._addresses.findOne({_id: new ObjectId(id)});
    }

    /**
     * Einzelne Adresse löschen
     */
    async delete(id) {
        let result = await this._addresses.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
};
