const { response } = require('express');
const textract = require('textract');
const fs = require('fs')
const path = require('path');

const handleFiles = (req, res = response) => {
    const { glossary, docx } = req.body;
    const txt = fs.readFileSync(`uploads/${glossary}`, { encoding: 'utf8', flag: 'r' }).toString();

    const lines = txt.replace(/(\r\n|\n|\r)/gm, "*********").split("*********");


    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].includes('=')) continue;
        const [key, value] = lines[i].split('=');
        
    }

    
    
    res.send('todo bn')
}

module.exports = {
    handleFiles
}