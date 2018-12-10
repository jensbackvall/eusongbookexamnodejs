const mongoose = require('mongoose');
const schema = mongoose.Schema;

const partners_schema = new schema( {
    country: String,
    flag: String,
    info_text: String
});

const translators_schema = new schema( {
    country: String,
    flag: String,
    info_text: String
});

const local_partners_schema = new schema( {
    partners: partners_schema,
    translators: translators_schema
});