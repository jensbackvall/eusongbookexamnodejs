const mongoose = require('mongoose');
const schema = mongoose.Schema;

const press_release_schema = new schema( {
    country: String,
    flag: String,
    title: String,
    intro_text: String,
    main_text: String
});

module.exports = mongoose.model('press_release', press_release_schema);