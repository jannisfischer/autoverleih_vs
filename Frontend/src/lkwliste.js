"use strict";

import Page from "./page";
import HtmlTemplate from "./lkwliste.html";

export default class Lkwliste extends Page {   
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Lkwliste";
        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        //_app.backend.fetch() returned ein JSON Array mit Autos. Gemockt:
        let dummyTruckArray = [
            {id: 123454, brand: "Mercedes", model:"LKW1", type: "7.5T", production_date:" 01.01.2013", status: "available"},
            {id: 123455, brand: "Mercedes", model:"LKW2", type: "3.5T", production_date:" 01.01.2001", status: "available"}
        ]
        const list = this._mainElement.firstElementChild.lastElementChild
        let trucklist = dummyTruckArray.map( (truck, index) => {
            let listItem = document.createElement("li")
            let truckInfo =document.createElement("div")
            truckInfo.className="truck-infos"
            let truckButtons = document.createElement("div")
            truckButtons.className="truck-buttons"

            let deleteButton = document.createElement("button")
            let rentButton = document.createElement("button")
            deleteButton.className="btn btn-danger"
            rentButton.className="btn btn-info"
            deleteButton.innerHTML="Löschen"
            rentButton.innerHTML="Ausleihen"
            truckButtons.appendChild(deleteButton)
            truckButtons.appendChild(rentButton)


            listItem.className="truck-container"

            let paragraphBrand=document.createElement("p")
            let paragraphModel=document.createElement("p")
            let paragraphType=document.createElement("p")
            let paragraphDate=document.createElement("p")
            let paragraphStatus=document.createElement("p")

            paragraphBrand.innerHTML="Marke: " + truck.brand
            paragraphModel.innerHTML="Modell: " + truck.model
            paragraphType.innerHTML="Typ: " + truck.type
            paragraphDate.innerHTML="Produktionsdatum: " + truck.production_date
            paragraphStatus.innerHTML="Status: " + truck.status
            truckInfo.appendChild(paragraphBrand)
            truckInfo.appendChild(paragraphModel)
            truckInfo.appendChild(paragraphType)
            truckInfo.appendChild(paragraphDate)
            truckInfo.appendChild(paragraphStatus)
            listItem.appendChild(truckInfo)
            listItem.appendChild(truckButtons)
            return listItem
        })
        trucklist.forEach((truck) => { list.appendChild(truck)})
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////

    }

}