const { response } = require('express');
const path = require('path')
const translateDox = require('../helpers/translateDox');

const handleFiles = async (req, res = response) => {
    const { glossary, docx } = req.body;

    try {
    
        const { result, fileName } = await translateDox(glossary, docx);
    
        if (!fileName) {
            return res.status(500).json({
                ok: false,
                msg: result
            });
        }

        return res.status(200).json({
            ok: true,
            msg: fileName
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }

}

module.exports = {
    handleFiles,
}