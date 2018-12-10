const General = require('./models/general_info');

General.find({}, (err, general_info) => {
    console.log(general_info);
    console.log(err);
});