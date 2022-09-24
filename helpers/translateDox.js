const textract = require('textract');
const fs = require('fs');
const mammoth = require("mammoth");
const HTMLtoDOCX = require('html-to-docx');
const { v4: uuidv4 } = require('uuid');

const translateDox = async (glossary, docx) => {

    const txtContent = fs.readFileSync(`uploads/${glossary}`, { encoding: 'ucs2', flag: 'r' }).toString();
    const lines = txtContent.replace(/(\r\n|\n|\r)/gm, "*********").split("*********").filter(item => {
        if (item.includes('=')) return item.trim();
    });


    // Extraccion del HTML
    const { value } = await mammoth.convertToHtml({ path: `uploads/${docx}` })

    let docxContent = value;

    // Traduccion del docx
    for (let i = 0; i < lines.length; i++) {
        const [key, value] = lines[i].split('=');
        docxContent = docxContent.replace(new RegExp(key.trim(), 'ig'), value.trim());
    }

    try {

        const fileName = await createNewDocx(docxContent);

        return {
            result: 'Docx file created successfully',
            fileName
        }

    } catch (error) {

        return {
            result: error
        };

    }

}

const createNewDocx = async (content) => {
    const html = `
        <!DOCTYPE html>
        <head></head>
            <body>
            
                ${content}
            </body>
        </html>
    `;

    const fileBuffer = await HTMLtoDOCX(html, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
    });

    const fileName = uuidv4() + '.docx';
    const filePath = 'public/translations/' + fileName;


    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileBuffer, (error) => {
            if (error) {
                reject('Docx file creation failed: ' + error);
            }

            resolve(fileName);
        });
    })
}

module.exports = translateDox;