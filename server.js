var express = require('Express');
var pg = require('pg');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var locus = require('locus');
var methodOverride = require('method-override');
var app = express();
var router = require('./controllers/routes');
var cookieParser = require('cookie-parser');
require('dotenv').load();

// middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true}
	));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(cookieParser(process.env.SECRET));

app.use('/', router);

var server = app.listen(process.env.PORT || 3000, function () {
var port = server.address().port;
  console.log('Server up and listening on', port);
});
