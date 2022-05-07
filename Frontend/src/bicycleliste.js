"use strict";

import Page from "./page";
import HtmlTemplate from "./bicycleliste.html";
import Buttonmethods from "./buttonmethods"


export default class Bycicleliste extends Page {   
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Bicycleliste";
        

        const backend = this._app.backend
        //Methoden aufgrund von Aufrufen aus verschiedenen Dateien in Klasse ausgelagert
        const buttonmethods = new Buttonmethods
        let result = await backend.fetch("GET", "/bicycle")
        //_app.backend.fetch() returned ein JSON Array mit Autos. Gemockt:
        let dummyBicycleArray = [
            {id: 123454, brand: "Volkswagen", model:"Scirroco", type: "coupe", production_date:" 01.01.2013", status: "available"},
            {id: 123455, brand: "Peugeot", model:"206cc", type: "convertible", production_date:" 01.01.2001", status: "available"}
        ]
        const list = this._mainElement.firstElementChild.lastElementChild
        let bicyclelist = result.map( (bicycle, index) => {
            let listItem = document.createElement("li")
            let bicycleInfo =document.createElement("div")
            bicycleInfo.className="bicycle-infos"
            let bicycleButtons = document.createElement("div")
            bicycleButtons.className="bicycle-buttons"

            let deleteButton = document.createElement("button")
            let rentButton = document.createElement("button")
            let giveBackButton = document.createElement("button")
            deleteButton.className="btn btn-danger"
            rentButton.className="btn btn-info"
            giveBackButton.className="btn btn-info"
            deleteButton.innerHTML="Löschen"
            rentButton.innerHTML="Ausleihen"
            giveBackButton.innerHTML="Zurückgeben"
            rentButton.addEventListener("click", () => buttonmethods.markAsRented(backend, bicycle))
            giveBackButton.addEventListener("click", () => buttonmethods.markAsAvailable(backend, bicycle))
            deleteButton.addEventListener("click", () => buttonmethods.deleteVehicle(backend, bicycle))

            bicycleButtons.appendChild(deleteButton)
            if(bicycle.status=="available") {
                bicycleButtons.appendChild(rentButton)
                }
            else {
                bicycleButtons.appendChild(giveBackButton)
            }


            listItem.className="bicycle-container"

            let paragraphBrand=document.createElement("p")
            let paragraphModel=document.createElement("p")
            let paragraphType=document.createElement("p")
            let paragraphDate=document.createElement("p")
            let paragraphSize=document.createElement("p")
            let paragraphStatus=document.createElement("p")

            paragraphBrand.innerHTML="Marke: " + bicycle.brand
            paragraphModel.innerHTML="Modell: " + bicycle.model
            paragraphType.innerHTML="Typ: " + bicycle.type
            paragraphDate.innerHTML="Produktionsdatum: " + bicycle.production_date
            paragraphSize.innerHTML="Größe: " + bicycle.size
            paragraphStatus.innerHTML="Status: " + bicycle.status
            bicycleInfo.appendChild(paragraphBrand)
            bicycleInfo.appendChild(paragraphModel)
            bicycleInfo.appendChild(paragraphType)
            bicycleInfo.appendChild(paragraphDate)
            bicycleInfo.appendChild(paragraphSize)
            bicycleInfo.appendChild(paragraphStatus)
            listItem.appendChild(bicycleInfo)
            listItem.appendChild(bicycleButtons)
            return listItem
        })
        bicyclelist.forEach((bicycle) => { list.appendChild(bicycle)})
        

    }

}