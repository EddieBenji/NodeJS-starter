const express = require('express');
const router = express.Router();
const DomainsController = require('../controllers/domain');

router.get('/domain', DomainsController.getDomains);

module.exports = router;
