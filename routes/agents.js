const express = require('express');
const router = express.Router();
const AgentsController = require('../controllers/agent');

router.get('/agent', AgentsController.getAgents);

module.exports = router;
