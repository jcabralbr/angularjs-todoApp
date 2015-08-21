var express = require('express'),
	config = require('./config'),
	bodyParser = require('body-parser');
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session');
var load = require('express-load');
var compression = require('compression');


module.exports = function() {
	var app = express();

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});
	app.use(bodyParser.json({limit: '1mb'}));
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.text({defaultCharset:'utf-8'}));

	app.use(cookieParser());

	app.use(expressSession({
			secret: config.sessionSecret,
			saveUninitialized: true,
			resave: true
	}));


	app.use(compression());
	load('app/models').then('app/controllers').then('app/routes').into(app);
	return app;
};

