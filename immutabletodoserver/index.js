var firebase = require("firebase");
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://swe432lecture12.firebaseio.com"
});
var fireRef = firebase.database().ref('todos');

var port = process.env.port || 3000;

app.post('/newTodo', function (req, res) {
    console.log("New req");
    console.log("Client wants to create todo: '" + req.body.todoText + "'");
    fireRef.push({"text": req.body.todoText}, function () {
        res.send("OK!");
    });
});
app.get('/emptyHtml.html', function (req, res) {
    console.log("Requested empty html");
    res.send("OK!");
});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});