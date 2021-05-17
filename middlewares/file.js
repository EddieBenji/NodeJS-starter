const multer = require('multer');
const path = require('path');

const MIME_TYPE_MAP = {
    'application/json': 'json',
    'text/javascript': 'js',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
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

exports.uploadFile = multer({
    storage,
    fileFilter: (req, file, callback) => {
        console.log('IN THE MIDDLEWARE!');
        console.log('file.mimetype ->', file.mimetype);
        console.log('path.extname(file.originalname) ->', path.extname(file.originalname));
        return callback(null, true);
    }
}).single('file');
