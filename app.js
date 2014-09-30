var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var tweets      = ["hello", "yep"];
var morgan      = require('morgan');
var hogan       = require('ejs');
var jsonParser  = bodyParser.json();
var urlParser   = bodyParser.urlencoded({ extended: false });
var headerType  = require('./header-type.js')

app.enable('view cache');
app.use(morgan('combined'));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render( 'index.ejs', {"tweets": tweets} )
});

app.post('/send', urlParser, function (req, res) {
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet);
		if (headerType(req.headers.access) === "html") {
			res.redirect('/', 302);
		} else if (headerType(req.headers.access) === "json") {
      res.send({"status": "ok", "message": "Tweet received"});
		} else {
			res.send({"status": "nok", "message": "header assign type not recognized"});
		}
	} else {
    res.send({"status": "nok", "message": "no tweet received"});
	}
});

app.listen(3030, function(){
  console.log("Listening on port 3030 ok")
});