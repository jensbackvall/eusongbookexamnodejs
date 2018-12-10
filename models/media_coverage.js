const mongoose = require('mongoose');
const schema = mongoose.Schema;

const media_coverage_schema = new schema( {
    type: String,
    country: String,
    date: Date,
    title: String,
    source: String,
    link: String
});

module.exports = mongoose.model('media_coverage_schema', media_coverage_schema);