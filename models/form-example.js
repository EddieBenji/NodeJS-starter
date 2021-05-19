const mongoose = require('mongoose');

const formExampleSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    forwarders: [ { type: String } ],
    serverIp: { type: String }
});

module.exports = mongoose.model('FormExample', formExampleSchema);
