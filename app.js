const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Our routes:
const domainRouter = require('./routes/domains');
const agentRouter = require('./routes/agents');
const connectionRouter = require('./routes/connections');
const fileRouter = require('./routes/files');
const forwarderRouter = require('./routes/forwarders');
const formExampleRouter = require('./routes/form-examples');

//initialize the app:
const cors = require('cors');
const app = express();

// Connect to the mongo db atlas.
mongoose.connect(
	'mongodb://localhost:27017/node-angular',
	{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
		console.log('connected to database !');
	})
	.catch((error) => {
		console.log('connection failed!');
		console.error('error: ', error);
	});

// with this, we parse the body always as json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// This will avoid the CORS issue;
app.use(cors());

// Every time we listen a GET to /files, we will serve the dir as an static folder to the UI.
app.use('/files', express.static(path.join(__dirname, 'files')));

// filtered the routes to have always '/api/posts' always.
app.use('/api', domainRouter);
app.use('/api', agentRouter);
app.use('/api', connectionRouter);
app.use('/api', fileRouter);
app.use('/api', forwarderRouter);
app.use('/api', formExampleRouter);

module.exports = app;
