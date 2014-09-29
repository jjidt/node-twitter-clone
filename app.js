var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var tweets      = [];

app.set('views', 'views');

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  res.render('index.hjs', {"name": "Johnny"});
});

app.post('/send', urlParser, function (req, res) {
	console.log(req.body);
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet);
    res.send({"status": "ok", "message": "tweet received"})
	} else {
    res.send({"status": "nok", "message": "no tweet received"})
	}
});

app.listen(3030, function(){
  console.log("Listening on port 3030")
});