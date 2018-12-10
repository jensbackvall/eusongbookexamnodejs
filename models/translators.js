const mongoose = require('mongoose');
const schema = mongoose.Schema;

const translator_schema = new schema( {
    country: String,
    flag: String,
    info_text: String
});

module.exports = mongoose.model('translator', translator_schema);