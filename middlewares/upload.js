const multer = require('multer');
const mimeTypes = require('mime-types');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const extension = mimeTypes.extension(file.mimetype);
        const filename = uuidv4() + '.' + extension;

        if (extension == 'txt') {
            req.body.glossary = filename;
        } else {
            req.body.docx = filename;
        }

        cb("", filename);
    }

});

const upload = multer({
    storage
})

module.exports = {
    storage,
    upload
};