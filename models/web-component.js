const mongoose = require('mongoose');

const webComponentSchema = mongoose.Schema({
    filePath: { type: String, required: true },
    customTagName: { type: String }
});

module.exports = mongoose.model('WebComponent', webComponentSchema);
