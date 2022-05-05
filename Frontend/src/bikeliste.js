"use strict";

import Page from "./page";
import HtmlTemplate from "./bikeliste.html";
import Buttonmethods from "./buttonmethods"


export default class Bikeliste extends Page {   
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Bikeliste";
        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        const backend = this._app.backend
        //Methoden aufgrund von Aufrufen aus verschiedenen Dateien in Klasse ausgelagert
        const buttonmethods = new Buttonmethods
        //_app.backend.fetch() returned ein JSON Array mit Autos. Gemockt:
        let dummybikeArray = [
            {id: 123454, brand: "Volkswagen", model:"Scirroco", type: "coupe", production_date:" 01.01.2013", status: "available"},
            {id: 123455, brand: "Peugeot", model:"206cc", type: "convertible", production_date:" 01.01.2001", status: "available"}
        ]
        let result = await backend.fetch("GET", "/motorbike")
        console.log(result)
        const list = this._mainElement.firstElementChild.lastElementChild
        let bikelist = result.map( (bike, index) => {
            let listItem = document.createElement("li")
            let bikeInfo =document.createElement("div")
            bikeInfo.className="bike-infos"
            let bikeButtons = document.createElement("div")
            bikeButtons.className="bike-buttons"

            let deleteButton = document.createElement("button")
            let rentButton = document.createElement("button")
            let giveBackButton = document.createElement("button")
            deleteButton.className="btn btn-danger"
            rentButton.className="btn btn-info"
            giveBackButton.className="btn btn-info"
            deleteButton.innerHTML="Löschen"
            rentButton.innerHTML="Ausleihen"
            giveBackButton.innerHTML="Zurückgeben"
            rentButton.addEventListener("click", () => buttonmethods.markAsRented(backend, bike))
            giveBackButton.addEventListener("click", () => buttonmethods.markAsAvailable(backend, bike))
            deleteButton.addEventListener("click", () => buttonmethods.deleteVehicle(backend, bike))

            bikeButtons.appendChild(deleteButton)
            if(bike.status=="available") {
                bikeButtons.appendChild(rentButton)
                }
            else {
                bikeButtons.appendChild(giveBackButton)
            }



            listItem.className="bike-container"

            let paragraphBrand=document.createElement("p")
            let paragraphModel=document.createElement("p")
            let paragraphType=document.createElement("p")
            let paragraphDate=document.createElement("p")
            let paragraphStatus=document.createElement("p")

            paragraphBrand.innerHTML="Marke: " + bike.brand
            paragraphModel.innerHTML="Modell: " + bike.model
            paragraphType.innerHTML="Typ: " + bike.type
            paragraphDate.innerHTML="Produktionsdatum: " + bike.production_date
            paragraphStatus.innerHTML="Status: " + bike.status
            bikeInfo.appendChild(paragraphBrand)
            bikeInfo.appendChild(paragraphModel)
            bikeInfo.appendChild(paragraphType)
            bikeInfo.appendChild(paragraphDate)
            bikeInfo.appendChild(paragraphStatus)
            listItem.appendChild(bikeInfo)
            listItem.appendChild(bikeButtons)
            return listItem
        })
        bikelist.forEach((bike) => { list.appendChild(bike)})
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////

    }

}