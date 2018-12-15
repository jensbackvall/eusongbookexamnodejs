const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user_schema = new schema( {
    name: String,
    password: String
});

module.exports = mongoose.model('user', user_schema);