const mongoose = require('mongoose');
const schema = mongoose.Schema;

const vip_schema = new schema( {
    title: String,
    personal_info: String,
    info_text: String,
    image: String
});

module.exports = mongoose.model('general_info', vip_schema);