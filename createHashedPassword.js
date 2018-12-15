const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EUsongbook', { useNewUrlParser: true });
const User = require('./models/User');

let hashedPword = bcrypt.hashSync('Beethoven', 10);
console.log(hashedPword);

let createdAdmin = new User ({
    name : "Jeppe",
    password: hashedPword
});     
createdAdmin.save(err =>{
    if (err) throw err;
    console.log("admin saved to database");
});
  