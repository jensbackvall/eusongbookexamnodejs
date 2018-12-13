const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const port = 3000;

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({secret: "Ssssecret-prrrecccioussss", cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
// Below we set the useNewUrlParser: true because the current version is deprecated
mongoose.connect('mongodb://localhost:27017/EUsongbook', { useNewUrlParser: true });
const Media = require('./models/media_coverage');

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index/index.html"));
app.get("/admin", (req, res) => res.sendFile(__dirname + "/public/admin_log_in/admin_log_in.html"));

app.get("/six_categories", (req, res) => 
    res.sendFile(__dirname + "/public/six_categories/six_categories.html")

);

app.get("/nominations_per_country", (req, res) => res.sendFile(__dirname + "/public/nominations_per_country/nominations_per_country.html"));
app.get("/press_releases", (req, res) => res.sendFile(__dirname + "/public/press_releases/press_releases.html"));
app.get("/media_coverage", (req, res) => res.sendFile(__dirname + "/public/media_coverage/media_coverage.html"));
app.get("/local_partners", (req, res) => res.sendFile(__dirname + "/public/local_partners/local_partners.html"));
app.get("/translators", (req, res) => res.sendFile(__dirname + "/public/translators/translators.html"));
app.get("/mission_statement", (req, res) => res.sendFile(__dirname + "/public/mission_statement/mission_statement.html"));
app.get("/who_we_are", (req, res) => res.sendFile(__dirname + "/public/who_we_are/who_we_are.html"));
app.get("/statutes", (req, res) => res.sendFile(__dirname + "/public/statutes/statutes.html"));
app.get("/contact_us", (req, res) => res.sendFile(__dirname + "/public/contact_us/contact_us.html"));
app.get("/donate", (req, res) => res.sendFile(__dirname + "/public/donate/donate.html"));

app.get("/data", (req, res) => {
    if (req.query.collection === "media_coverage"){
        Media.find({}, (err, media_coverage) => {
            res.json(media_coverage);
        })
    }
});

app.post("/update", (req, res) => {
    const theId = req.body.id;
    console.log("theId: ", theId);
    const theDate = req.body.date;
    console.log("theDate: ", theDate);
    const theTitle = req.body.title;
    console.log("TheTitle: ", theTitle);
    const theSource = req.body.source;
    console.log("theSource: ", theSource);
    const theLink = req.body.link;
    console.log("theLink: ", theLink);
    if (req.session.isLoggedIn === true) {
        console.log("Inside /update: Admin is logged in");
        if (req.query.collection === "media_coverage"){
            var query = { id: req.body.id };
            Model.findOne(query, function (err, doc){
                doc.date = theDate;
                console.log(req.body.date);
                doc.title = req.body.title;
                doc.source = req.body.source;
                doc.link = req.body.link;
                doc.save();
            });
        }
    } else {
        res.json({"response": "Only ADMIN can update!"});
    }
});

app.post("/delete", (req, res) => {
    if (req.session.isLoggedIn = true) {

    } else {
        res.json({"response": "Only ADMIN can delete!"});
    }
});

app.post("/signin", (req, res) => {

    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;

    if (enteredUsername && enteredPassword) {

        console.log('entered username:' + enteredUsername + " entered password -> " + enteredPassword) 
        // TODO: find user credentials in mongo for comparison and validation

        if (enteredUsername === "Jeppe" && enteredPassword === "Beethoven") {
            req.session.isLoggedIn = true;
            console.log("isLoggedIn is now TRUE!!!");
            res.json({"response": "Logged In"});
        } else {
            res.json({"response": "username or password is INCORRECT"});
        }
    }
});

app.listen(port, () => console.log(`Listening on port ${port}!`))