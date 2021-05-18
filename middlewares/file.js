const multer = require('multer');

const { MIME_TYPE_MAP, JSON_LOWER_CASE, JSON_DIR_PATH, BUNDLES_DIR_PATH } = require('../utils/constants.js');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPE_MAP[ file.mimetype ];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        // the path is relative to server.js!!
        callback(error, isValid === JSON_LOWER_CASE ? JSON_DIR_PATH : BUNDLES_DIR_PATH);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

exports.uploadFile = multer({ storage }).single('file');
