const mongoose = require('mongoose');

const webComponentSchema = mongoose.Schema({
    filePath: { type: String, required: true },
    customTagName: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('WebComponent', webComponentSchema);
