const router = require('express').Router();

// Middlewares
const { upload } = require('../middlewares/upload');

// Controllers
const { handleFiles } = require('../controller/files');


// Routes

router.post('/', [
    upload.fields([
        { name: 'docx', maxCount: 1 },
        { name: 'txt', maxCount: 1 }
    ])
], handleFiles)

module.exports = router;