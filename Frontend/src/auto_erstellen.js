import Page from "./page";
import HtmlTemplate from "./auto_erstellen.html";



export default class Auto_Erstellen extends Page {
    constructor(app) {
        super(app,HtmlTemplate);
    }


    async init() {
        await super.init();
        const backend = this._app.backend

        this._title = "Auto erstellen";

        const createCar = async() => {
            let brandValue=form.children[0].lastElementChild.value
            let modelValue=form.children[1].lastElementChild.value
            let typeValue=form.children[2].lastElementChild.value
            let dateValue=form.children[3].lastElementChild.value

            let body = {body: {
                brand: brandValue,
                model: modelValue,
                type: typeValue,
                production_date: dateValue,
                status: "available"
            }}
            console.log(brandValue, modelValue, typeValue, dateValue)
            await backend.fetch("POST", "/car", body)
            alert("Auto wurde erstellt und zur Leihe registriert!")
        }
        let form = this._mainElement.firstElementChild.lastElementChild.firstElementChild
        let submitButton = this._mainElement.firstElementChild.lastElementChild.lastElementChild
        submitButton.addEventListener("click", createCar)
    }
}