import Page from "./page";
import HtmlTemplate from "./auto_erstellen.html";


export default class Auto_Erstellen extends Page {
    constructor(app) {
        super(app,HtmlTemplate);
    }


    async init() {
        await super.init();
        this._title = "Auto erstellen";
        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////
    }
}