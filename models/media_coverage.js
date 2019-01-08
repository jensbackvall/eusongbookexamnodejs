const mongoose = require('mongoose');
//const schema = mongoose.Schema;

const media_coverage_schema = new mongoose.Schema( {
    id: Number,
    type: String,
    country: String,
    date: String,
    title: String,
    source: String,
    link: String
});

module.exports = mongoose.model('media_coverage', media_coverage_schema);
