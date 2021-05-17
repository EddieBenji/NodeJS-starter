const express = require('express');
const bodyParser = require('body-parser');

// Our routes:
const domainRouter = require('./routes/domains');
const agentRouter = require('./routes/agents');
const connectionRouter = require('./routes/connections');

//initialize the app:
const app = express();

// with this, we parse the body always as json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// This will avoid the CORS issue;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
    next();
});

// filtered the routes to have always '/api/posts' always.
app.use('/api', domainRouter);
app.use('/api', agentRouter);
app.use('/api', connectionRouter);

module.exports = app;
