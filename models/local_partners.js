const mongoose = require('mongoose');
const schema = mongoose.Schema;

const partner_schema = new schema( {
    id: Number,
    country: String,
    //flag: String,
    information: String
});

module.exports = mongoose.model('local_partner', local_partners_schema);