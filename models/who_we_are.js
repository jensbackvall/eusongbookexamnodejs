const mongoose = require('mongoose');
const schema = mongoose.Schema;

const vip_schema = new schema( {
    id: Number,
    title: String,
    personal_info: String,
    info_text: String,
    image: String
});

module.exports = mongoose.model('vip', vip_schema);