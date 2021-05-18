const mongoose = require('mongoose');

const jsonSchema = mongoose.Schema({
    uiSchemaFilePath: { type: String },
    schemaFilePath: { type: String }
});

module.exports = mongoose.model('Json', jsonSchema);
