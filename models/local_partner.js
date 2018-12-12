const mongoose = require('mongoose');
const schema = mongoose.Schema;

const partner_schema = new schema( {
    id: Number,
    country: String,
    flag: String,
    info_text: String
});

module.exports = mongoose.model('local_partner', partner_schema);