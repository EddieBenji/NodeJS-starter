const express = require('express');
const router = express.Router();
const FilesController = require('../controllers/file');
const addDirsIfNeeded = require('../middlewares/checkDirs');
const { uploadFile } = require('../middlewares/file');

router.post('/file', addDirsIfNeeded, uploadFile, FilesController.addFile);
router.get('/files', FilesController.getSchemas);

module.exports = router;
