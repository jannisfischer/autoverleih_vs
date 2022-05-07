"use strict";

import Page from "./page";
import HtmlTemplate from "./lkwliste.html";
import Buttonmethods from "./buttonmethods"


export default class Lkwliste extends Page {   
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Lkwliste";
        const backend = this._app.backend
        //Methoden aufgrund von Aufrufen aus verschiedenen Dateien in Klasse ausgelagert
        const buttonmethods = new Buttonmethods
        let result = await backend.fetch("GET", "/truck")
        
        let dummyTruckArray = [
            {id: 123454, brand: "Mercedes", model:"LKW1", type: "7.5T", production_date:" 01.01.2013", status: "available"},
            {id: 123455, brand: "Mercedes", model:"LKW2", type: "3.5T", production_date:" 01.01.2001", status: "available"}
        ]
        const list = this._mainElement.firstElementChild.lastElementChild
        let trucklist = result.map( (truck, index) => {
            let listItem = document.createElement("li")
            let truckInfo =document.createElement("div")
            truckInfo.className="truck-infos"
            let truckButtons = document.createElement("div")
            truckButtons.className="truck-buttons"

            let deleteButton = document.createElement("button")
            let rentButton = document.createElement("button")
            let giveBackButton = document.createElement("button")
            deleteButton.className="btn btn-danger"
            rentButton.className="btn btn-info"
            giveBackButton.className="btn btn-info"
            deleteButton.innerHTML="Löschen"
            rentButton.innerHTML="Ausleihen"
            giveBackButton.innerHTML="Zurückgeben"
            rentButton.addEventListener("click", () => buttonmethods.markAsRented(backend, truck))
            giveBackButton.addEventListener("click", () => buttonmethods.markAsAvailable(backend, truck))
            deleteButton.addEventListener("click", () => buttonmethods.deleteVehicle(backend, truck))

            truckButtons.appendChild(deleteButton)
            if(truck.status=="available") {
                truckButtons.appendChild(rentButton)
                }
            else {
                truckButtons.appendChild(giveBackButton)
            }



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
        
    }

}