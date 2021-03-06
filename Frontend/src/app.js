"use strict";

import Backend from "./backend.js";
import Router from "./router.js";
import "./app.css";
import Autoliste from "./autoliste.js";
import Auto_Erstellen from "./auto_erstellen.js"

/**
 * Hauptklasse App: Steuert die gesamte Anwendung
 *
 * Diese Klasse erzeugt den Single Page Router zur Navigation innerhalb
 * der Anwendung und ein Datenbankobjekt zur Verwaltung der Adressliste.
 * Darüber hinaus beinhaltet sie verschiedene vom Single Page Router
 * aufgerufene Methoden, zum Umschalten der aktiven Seite.
 */
class App {
    /**
     * Konstruktor.
     */
    constructor() {
        // Datenbank-Klasse zur Verwaltung der Datensätze
        this.backend = new Backend();

        // Single Page Router zur Steuerung der sichtbaren Inhalte
        //// TODO: Routing-Regeln anpassen und ggf. neue Methoden anlegen ////
        this.router = new Router([
            {
                url: "^/$",
                show: () => this._gotoList()
            },
            {
                url: "/autoliste",
                show: () => this._gotoCars()
            },
                        {
                url: "/lkwliste",
                show: () => this._gotoTrucks()
            },
                        {
                url: "/bicycleliste",
                show: () => this._gotoBicycles()
            },
                        {
                url: "/bikeliste",
                show: () => this._gotoBikes()
            },
            {
                url: "/auto_erstellen",
                show: () => this._gotoCreateCar()
            },
            
            {
                url: ".*",
                show: () => this._gotoList()
            },
        ]);

        // Fenstertitel merken, um später den Name der aktuellen Seite anzuhängen
        this._documentTitle = document.title;

        // Von dieser Klasse benötigte HTML-Elemente
        this._pageCssElement = document.querySelector("#page-css");
        this._bodyElement = document.querySelector("body");
        this._menuElement = document.querySelector("#app-menu");
    }

    /**
     * Initialisierung der Anwendung beim Start. Im Gegensatz zum Konstruktor
     * der Klasse kann diese Methode mit der vereinfachten async/await-Syntax
     * auf die Fertigstellung von Hintergrundaktivitäten warten, ohne dabei
     * mit den zugrunde liegenden Promise-Objekten direkt hantieren zu müssen.
     */
    async init() {
        try {
            await this.backend.init();
            this.router.start();
        } catch (ex) {
            this.showException(ex);
        }
    }

    /**
     * Übersichtsseite anzeigen. Wird vom Single Page Router aufgerufen.
     */
    async _gotoList() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: PageList} = await import("./page-list/page-list.js");

            let page = new PageList(this);
            await page.init();
            this._showPage(page, "list");
        } catch (ex) {
            this.showException(ex);
        }
    }
    async _gotoCars() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: Autoliste} = await import("./autoliste.js");

            let page = new Autoliste(this);
            await page.init();
            this._showPage(page, "autoliste");
        } catch (ex) {
            this.showException(ex);
        }
    }
        async _gotoTrucks() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: Lkwliste} = await import("./lkwliste.js");

            let page = new Lkwliste(this);
            await page.init();
            this._showPage(page, "lkwliste");
        } catch (ex) {
            this.showException(ex);
        }
    }
        async _gotoBicycles() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: Bicycleliste} = await import("./bicycleliste.js");

            let page = new Bicycleliste(this);
            await page.init();
            this._showPage(page, "bicycleliste");
        } catch (ex) {
            this.showException(ex);
        }
    }
        async _gotoBikes() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: Bikeliste} = await import("./bikeliste.js");

            let page = new Bikeliste(this);
            await page.init();
            this._showPage(page, "bikeliste");
        } catch (ex) {
            this.showException(ex);
        }
    }
    async _gotoCreateCar() {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: Auto_Erstellen} = await import("./auto_erstellen.js");

            let page = new Auto_Erstellen(this);
            await page.init();
            this._showPage(page, "auto_erstellen");
        } catch (ex) {
            this.showException(ex);
        }
    }

    /**
     * Interne Methode zum Umschalten der sichtbaren Seite.
     *
     * @param  {Page} page Objekt der anzuzeigenden Seiten
     * @param  {String} name Name zur Hervorhebung der Seite im Menü
     */
    _showPage(page, name) {
        // Fenstertitel aktualisieren
        document.title = `${this._documentTitle} – ${page.title}`;

        // Stylesheet der Seite einfügen
        this._pageCssElement.innerHTML = page.css;

        // Aktuelle Seite im Kopfbereich hervorheben
        this._menuElement.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        this._menuElement.querySelectorAll(`li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));

        // Sichtbaren Hauptinhalt austauschen
        this._bodyElement.querySelector("main")?.remove();
        this._bodyElement.appendChild(page.mainElement);
    }

    /**
     * Hilfsmethode zur Anzeige eines Ausnahmefehlers. Der Fehler wird in der
     * Konsole protokolliert und als Popupmeldung angezeigt.
     *
     * @param {Object} ex Abgefangene Ausnahme
     */
    showException(ex) {
        console.error(ex);

        if (ex.message) {
            alert(ex.message)
        } else {
            alert(ex.toString());
        }
    }
}

/**
 * Anwendung starten
 */
window.addEventListener("load", async () => {
    let app = new App();
    await app.init();
});
