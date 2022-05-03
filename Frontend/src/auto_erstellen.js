import Page from "./page";

export default class Auto_Erstellen extends Page {
    html="<h2>test</h2>" 
    constructor(app) {
        super(app,html);
    }

    async init() {

        this._title="autoliste"
        super.init()
    }
}