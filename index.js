var express = require('express');
var app = express();
var data  = require("./data.js")
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));

app.post('/', (req, res) => {
  var artist = req.body.artist;
  var album = req.body.album;
  var id = req.body.id;
  if (artist && album) {
    res.send({id: data[artist][album]});
  } else if (id) {
    res.send({url: "www.aubreyand.com/" + id});
  } else {
    res.send("");
  }
});

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.get('/static/index.js', (req, res) => {
  res.sendFile('static/index.js', {root: __dirname});
});


app.listen(8080);
