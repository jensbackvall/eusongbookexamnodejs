const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const general_info_schema = new Schema( {
    contact_name: String,
    contact_phone: String,
    contact_mail: String,
    mission_statement: String,
    statutes: String
});

module.exports = mongoose.model('general_info', general_info_schema);