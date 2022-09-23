const { response } = require('express');
const makeTranslation = require('../helpers/makeTranslation');

const handleFiles = async (req, res = response) => {
    const { glossary, docx } = req.body;
    try {
        const translation = await makeTranslation(glossary, docx)

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