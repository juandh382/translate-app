const { response } = require('express');

const handleFiles = (req, res = response) => {
    const { glossary, docx } = req.body;
    
    res.send('todo bn')
}

module.exports = {
    handleFiles
}