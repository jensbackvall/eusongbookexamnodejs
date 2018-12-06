const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index/index.html"))


app.listen(port, () => console.log(`Listening on port ${port}!`))