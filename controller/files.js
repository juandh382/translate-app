const { response } = require('express');
const translateDox = require('../helpers/translateDox');

const handleFiles = async (req, res = response) => {
    const { glossary, docx } = req.body;
    try {
        const translation = await translateDox(glossary, docx)
        return res.status(200).json({
            ok: true,
            msg: translation
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }

}

module.exports = {
    handleFiles
}