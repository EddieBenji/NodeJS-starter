const mongoose = require('mongoose');

const jsonSchema = mongoose.Schema({
    uiSchemaFilePath: { type: String, required: true },
    schemaFilePath: { type: String, required: true },
    formName: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Json', jsonSchema);
