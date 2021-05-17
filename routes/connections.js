const express = require('express');
const router = express.Router();
const ConnectionsController = require('../controllers/connection');

router.post('/test/mock-server', ConnectionsController.checkConnection);

module.exports = router;
