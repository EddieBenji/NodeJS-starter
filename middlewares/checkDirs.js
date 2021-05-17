const fs = require('fs');
const path = require('path');

const createDirIfNotExists = (dirToCreate) => {
    if (!fs.existsSync(dirToCreate)) {
        fs.mkdirSync(dirToCreate);
    }
};

module.exports = (req, res, next) => {
    // base dir:
    const filesDir = path.normalize(path.join(__dirname, '..', 'files'));

    createDirIfNotExists(filesDir);
    createDirIfNotExists(path.normalize(path.join(filesDir, 'bundles'))); // bundles dir.
    createDirIfNotExists(path.normalize(path.join(filesDir, 'json'))); // jsons dir.

    next();
};