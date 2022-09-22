const router = require('express').Router();
const multer = require('multer');
const { handleFiles } = require('../controller/files');

const upload = multer({
    dest: 'uploads/'
})

router.post('/', [
    upload.fields([
        { name: 'docx', maxCount: 1 },
        { name: 'txt', maxCount: 1 }
    ])
], handleFiles)

module.exports = router;