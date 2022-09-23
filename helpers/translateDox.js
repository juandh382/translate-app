const textract = require('textract');
const fs = require('fs');
const mammoth = require("mammoth");

const translateDox = (glossary, docx) => {
    return new Promise((resolve, reject) => {
        const txtContent = fs.readFileSync(`uploads/${glossary}`, { encoding: 'ucs2', flag: 'r' }).toString();
        const lines = txtContent.replace(/(\r\n|\n|\r)/gm, "*********").split("*********").filter(item => {
            if (item.includes('=')) return item.trim();
        });

        mammoth.convertToHtml({ path: `uploads/${docx}` })
            .then(function (result) {
                const html = result.value; // The generated HTML
                let docxContent = html;
                for (let i = 0; i < lines.length; i++) {
                    const [key, value] = lines[i].split('=');
                    docxContent = docxContent.toLocaleLowerCase().replaceAll(key.toLocaleLowerCase().trim(), value.toLocaleLowerCase().trim());
                }
                resolve(docxContent);
            })
            .catch(error => reject(error))
            .done();
    });
}

module.exports = translateDox;