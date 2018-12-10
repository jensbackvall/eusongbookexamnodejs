const mongoose = require('mongoose');
const schema = mongoose.Schema;

const general_info_schema = new schema( {
    contact_name: String,
    contact_address: String,
    contact_phone: String,
    contact_mail: String,
    mission_statement: String
});

