const mongoose = require('mongoose');
const schema = mongoose.Schema;

const media_coverage_schema = new schema( {
    id: Number,
    type: String,
    country: String,
    date: String,
    title: String,
    source: String,
    link: String
});

module.exports = mongoose.model('media_coverage', media_coverage_schema);

//module.exports = mongoose.model('general_info', general_info_schema);