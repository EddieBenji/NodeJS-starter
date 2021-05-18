const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Our routes:
const domainRouter = require('./routes/domains');
const agentRouter = require('./routes/agents');
const connectionRouter = require('./routes/connections');
const fileRouter = require('./routes/files');

//initialize the app:
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
// Every time we listen a GET to /files, we will serve the dir as an static folder to the UI.
app.use('/files', express.static(path.join(__dirname, 'files')));


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
app.use('/api', fileRouter);

module.exports = app;
