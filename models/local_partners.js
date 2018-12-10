const mongoose = require('mongoose');
const schema = mongoose.Schema;

const partner_schema = new schema( {
    country: String,
    flag: String,
    info_text: String
});

module.exports = mongoose.model('local_partner', local_partners_schema);