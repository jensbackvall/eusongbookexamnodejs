const express = require('express');
const app = express();
const port = 3000;



app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EUsongbook');

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index/index.html"))
app.get("/six_categories", (req, res) => res.sendFile(__dirname + "/public/six_categories/six_categories.html"))
app.get("/nominations_per_country", (req, res) => res.sendFile(__dirname + "/public/nominations_per_country/nominations_per_country.html"))
app.get("/press_releases", (req, res) => res.sendFile(__dirname + "/public/press_releases/press_releases.html"))
app.get("/media_coverage", (req, res) => res.sendFile(__dirname + "/public/media_coverage/media_coverage.html"))
app.get("/local_partners", (req, res) => res.sendFile(__dirname + "/public/local_partners/local_partners.html"))
app.get("/translators", (req, res) => res.sendFile(__dirname + "/public/translators/translators.html"))
app.get("/mission_statement", (req, res) => res.sendFile(__dirname + "/public/mission_statement/mission_statement.html"))
app.get("/who_we_are", (req, res) => res.sendFile(__dirname + "/public/who_we_are/who_we_are.html"))
app.get("/statutes", (req, res) => res.sendFile(__dirname + "/public/statutes/statutes.html"))
app.get("/contact_us", (req, res) => res.sendFile(__dirname + "/public/contact_us/contact_us.html"))
app.get("/donate", (req, res) => res.sendFile(__dirname + "/public/donate/donate.html"))


app.listen(port, () => console.log(`Listening on port ${port}!`))