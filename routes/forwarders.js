const express = require('express');
const router = express.Router();
const ForwardersController = require('../controllers/forwarders');

router.get('/forwarders', ForwardersController.getForwarders);

module.exports = router;
