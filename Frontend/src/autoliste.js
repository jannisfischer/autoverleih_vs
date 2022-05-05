"use strict";

import Page from "./page";
import HtmlTemplate from "./autoliste.html";
import Backend from "./backend";
import Buttonmethods from "./buttonmethods"

export default class Autoliste extends Page {   
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Autoliste";

        const backend = new Backend
        //Methoden aufgrund von Aufrufen aus verschiedenen Dateien in Klasse ausgelagert
        const buttonmethods = new Buttonmethods
        console.log(buttonmethods)
        await backend.init()
        let result = await backend.fetch("GET", "/car")
        console.log(result)
        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        //_app.backend.fetch() returned ein JSON Array mit Autos. Gemockt:
        let dummyCarArray = [
            {id: 123454, brand: "Volkswagen", model:"Scirroco", type: "coupe", production_date:" 01.01.2013", status: "available"},
            {id: 123455, brand: "Peugeot", model:"206cc", type: "convertible", production_date:" 01.01.2001", status: "available"}
        ]
        const list = this._mainElement.firstElementChild.lastElementChild
        let carlist = result.map( (car, index) => {


            let listItem = document.createElement("li")
            let carInfo =document.createElement("div")
            carInfo.className="car-infos"
            let carButtons = document.createElement("div")
            carButtons.className="car-buttons"

            let deleteButton = document.createElement("button")
            let rentButton = document.createElement("button")
            let giveBackButton = document.createElement("button")
            deleteButton.className="btn btn-danger"
            rentButton.className="btn btn-info"
            giveBackButton.className="btn btn-info"
            deleteButton.innerHTML="Löschen"
            rentButton.innerHTML="Ausleihen"
            giveBackButton.innerHTML="Zurückgeben"
            rentButton.addEventListener("click", () => buttonmethods.markAsRented(backend, car))
            giveBackButton.addEventListener("click", () => buttonmethods.markAsAvailable(backend, car))
            deleteButton.addEventListener("click", () => buttonmethods.deleteVehicle(backend, car))

            carButtons.appendChild(deleteButton)
            if(car.status=="available") {
                carButtons.appendChild(rentButton)
                }
            else {
                carButtons.appendChild(giveBackButton)
            }

            listItem.className="car-container"

            let paragraphBrand=document.createElement("p")
            let paragraphModel=document.createElement("p")
            let paragraphType=document.createElement("p")
            let paragraphDate=document.createElement("p")
            let paragraphStatus=document.createElement("p")

            paragraphBrand.innerHTML="Marke: " + car.brand
            paragraphModel.innerHTML="Modell: " + car.model
            paragraphType.innerHTML="Typ: " + car.type
            paragraphDate.innerHTML="Produktionsdatum: " + car.production_date
            paragraphStatus.innerHTML="Status: " + car.status
            carInfo.appendChild(paragraphBrand)
            carInfo.appendChild(paragraphModel)
            carInfo.appendChild(paragraphType)
            carInfo.appendChild(paragraphDate)
            carInfo.appendChild(paragraphStatus)
            listItem.appendChild(carInfo)
            listItem.appendChild(carButtons)
            return listItem
        })
        carlist.forEach((car) => { list.appendChild(car)})
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////

    }

}