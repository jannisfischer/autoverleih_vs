import AddressService from "../service/address.service.js";
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Klasse für alle Anfragen an /address/...
 */
export default class AddressController {
    /**
     * Konstruktor. Hier werden die HTTP-Handler-Methoden registriert.
     */
    constructor(server, prefix) {
        // Prefix merken
        this._service = new AddressService();
        this._prefix = prefix;

        // Collection: Adressen (Liste von Adressen)
        server.get(prefix, wrapHandler(this, this.search));
        server.post(prefix, wrapHandler(this, this.create));

        // Ressource: Adresse (einzelne Adresse)
        server.get(prefix + "/:id", wrapHandler(this, this.read));
        server.put(prefix + "/:id", wrapHandler(this, this.update));
        server.patch(prefix + "/:id", wrapHandler(this, this.update));
        server.del(prefix + "/:id", wrapHandler(this, this.delete));
    }

    /**
     * Hilfsmethode zum Einfügen der HATEOAS-Links in eine Antwort
     */
    _insertHateoasLinks(result) {
        let url = `${this._prefix}/${result._id}`;

        result._links = {
            read:   {url: url, method: "GET"},
            update: {url: url, method: "PUT"},
            patch:  {url: url, method: "PATCH"},
            delete: {url: url, method: "DELETE"},
        }
    }

    /**
     * GET /cars:
     * Liste von Adressen liefern
     */
    async search(req, res, next) {
        // Suche in der Datenbank ausführen
        let result = await this._service.search(req.query);

        // HATEOAS-Links einfügen
        result.forEach(entity => this._insertHateoasLinks(entity));

        // Ergebnis zurückliefern
        res.sendResult(result);
        return next();
    }

    /**
     * POST /address:
     * Neue Adresse anlegen
     */
    async create(req, res, next) {
        // Neue Adresse in der Datenbank speichern
        let result = await this._service.create(req.body);

        // HATEOAS-Links einfügen
        this._insertHateoasLinks(result);

        // Ergebnis zurückliefern
        res.status(201);    // Created
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);
        return next();
    }

    /**
     * GET /address/:id:
     * Lesen einer einzelnen Adresse anhand ihrer ID
     */
    async read(req, res, next) {
        // Adresse in der Datenbank suchen
        let result = await this._service.read(req.params.id);

        // Ergebnis zurückliefern
        if (result) {
            // HATEOAS-Links einfügen
            this._insertHateoasLinks(result);

            // Gefundene Adresse schicken
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Datensatz nicht gefunden.");
        }

        return next();
    }

    /**
     * PUT /address/:id:
     * PATCH /address/:id
     * Überschreiben einer einzelnen Adresse
     */
    async update(req, res, next) {
        // Adresse in der Datenbank ändern
        let result = await this._service.update(req.params.id, req.body);

        // Ergebnis zurückliefern
        if (result) {
            // HATEOAS-Links einfügen
            this._insertHateoasLinks(result);

            // Gefundene Adresse schicken
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Datensatz nicht gefunden.");
        }

        return next();
    }

    /**
     * DELETE /address/:id
     * Einzelne Adresse löschen
     */
    async delete(req, res, next) {
        // Adresse in der Datenbank löschen
        await this._service.delete(req.params.id);

        // Ergebnis zurückliefern
        res.status(204);
        res.sendResult({});
        return next();
    }
};
