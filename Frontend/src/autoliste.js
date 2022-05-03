"use strict";

import Page from "./page";

export default class Autoliste extends Page {   
    html="<h2>test</h2>" 
    constructor(app) {
        super(app,html);
    }

    async init() {

        this._title="autoliste"
        super.init()
    }

}