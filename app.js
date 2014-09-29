var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var tweets      = [];
var morgan      = require('morgan');
var ejs         = require('ejs');

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(morgan('combined'));

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  res.render('index.ejs', {
    locals: {
    	'title': title,
    	'header': header,
    	'tweets': tweets,
    	stylesheets: ['/public/style.css']
    }
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
  console.log("Listening on port 3030 ok")
});