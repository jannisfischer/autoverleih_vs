"use strict";

import Page from "./page";
import HtmlTemplate from "./autoliste.html";

export default class Autoliste extends Page {   
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Autoliste";
        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////

    }

}