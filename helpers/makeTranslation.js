const textract = require('textract');
const fs = require('fs')
const path = require('path');

const makeTranslation = (glossary, docx) => {
    return new Promise((resolve, reject) => {
        const txtContent = fs.readFileSync(`uploads/${glossary}`, { encoding: 'utf8', flag: 'r' }).toString();
        const lines = txtContent.replace(/(\r\n|\n|\r)/gm, "*********").split("*********");


        textract.fromFileWithPath(`uploads/${docx}`, function (error, text) {

            if (error) {
                reject(error);
            }


            let docxContent = '';


            for (let i = 0; i < lines.length; i++) {
                if (!lines[i].includes('=')) continue;
                const [key, value] = lines[i].split('=');

                docxContent = text.replace(key.trim(), value.trim());
            }

            resolve(docxContent);
        });
    });
}

module.exports = makeTranslation;