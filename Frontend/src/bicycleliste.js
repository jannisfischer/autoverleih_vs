"use strict";

import Page from "./page";
import HtmlTemplate from "./bicycleliste.html";

export default class Bycicleliste extends Page {   
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Bicycleliste";
        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        //_app.backend.fetch() returned ein JSON Array mit Autos. Gemockt:
        let dummyBicycleArray = [
            {id: 123454, brand: "Volkswagen", model:"Scirroco", type: "coupe", production_date:" 01.01.2013", status: "available"},
            {id: 123455, brand: "Peugeot", model:"206cc", type: "convertible", production_date:" 01.01.2001", status: "available"}
        ]
        const list = this._mainElement.firstElementChild.lastElementChild
        let bicyclelist = dummyBicycleArray.map( (bicycle, index) => {
            let listItem = document.createElement("li")
            let bicycleInfo =document.createElement("div")
            bicycleInfo.className="bicycle-infos"
            let bicycleButtons = document.createElement("div")
            bicycleButtons.className="bicycle-buttons"

            let deleteButton = document.createElement("button")
            let rentButton = document.createElement("button")
            deleteButton.className="btn btn-danger"
            rentButton.className="btn btn-info"
            deleteButton.innerHTML="Löschen"
            rentButton.innerHTML="Ausleihen"
            bicycleButtons.appendChild(deleteButton)
            bicycleButtons.appendChild(rentButton)


            listItem.className="bicycle-container"

            let paragraphBrand=document.createElement("p")
            let paragraphModel=document.createElement("p")
            let paragraphType=document.createElement("p")
            let paragraphDate=document.createElement("p")
            let paragraphStatus=document.createElement("p")

            paragraphBrand.innerHTML="Marke: " + bicycle.brand
            paragraphModel.innerHTML="Modell: " + bicycle.model
            paragraphType.innerHTML="Typ: " + bicycle.type
            paragraphDate.innerHTML="Produktionsdatum: " + bicycle.production_date
            paragraphStatus.innerHTML="Status: " + bicycle.status
            bicycleInfo.appendChild(paragraphBrand)
            bicycleInfo.appendChild(paragraphModel)
            bicycleInfo.appendChild(paragraphType)
            bicycleInfo.appendChild(paragraphDate)
            bicycleInfo.appendChild(paragraphStatus)
            listItem.appendChild(bicycleInfo)
            listItem.appendChild(bicycleButtons)
            return listItem
        })
        bicyclelist.forEach((bicycle) => { list.appendChild(bicycle)})
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////

    }

}