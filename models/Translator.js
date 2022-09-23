const fs = require('fs');

const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

class Translator {
    
    constructor() {
        this.doc = new Docxtemplater();
    }

}

module.exports = Translator;
