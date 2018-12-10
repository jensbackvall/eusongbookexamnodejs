var General = require('./models/local_partners');


let new_entry = new General({

    partners: {country: "dk1", flag: "flag1", info_text: "1a partner"},
    translators: {country: "dk1", flag: "flag1", info_text: "a1 translator"}
       
});

new_entry.save(err =>{
        if (err) throw err;
});

/*
const partner_schema = new schema( {
        country: String,
        flag: String,
        info_text: String
    });
    
    const translator_schema = new schema( {
        country: String,
        flag: String,
        info_text: String
    });
    
    const local_partners_schema = new schema( {
        partners: partners_schema,
        translators: translators_schema
    });*/