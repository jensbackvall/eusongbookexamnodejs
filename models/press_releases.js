const mongoose = require('mongoose');
const schema = mongoose.Schema;

const press_releases_schema = new schema( {
    country: String,
    flag: String,
    title: String,
    intro_text: String,
    main_text: String
});