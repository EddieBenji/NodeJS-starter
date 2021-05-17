const multer = require('multer');

const MIME_TYPE_MAP = {
    'application/json': 'json',
    'text/javascript': 'js'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPE_MAP[ file.mimetype ];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        // the path is relative to server.js!!
        callback(error, isValid === 'json' ? 'files/json' : 'files/bundles');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

exports.uploadFile = multer({ storage }).single('file');
