const express = require('express');
const router = express.Router();
const FilesController = require('../controllers/file');
const { uploadFile } = require('../middlewares/file');

router.post('/file', uploadFile, FilesController.addFile);
module.exports = router;
