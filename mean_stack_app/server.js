// BASE SETUP
// ======================================

//GET CONFIG FILE
var config = require('./config');

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var jwt 	   = require('jsonwebtoken');	// used for auth tokens
var mongoose   = require('mongoose');
var User 	   = require('./app/models/user'); //get User schema
var port       = config.port;
var secret 	   = config.secret; //used in creation of JWT tokens




// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});


// log all requests to the console 
app.use(morgan('dev'));

//connect to our database
mongoose.connect(config.database);

// ROUTES FOR OUR API
// ======================================

// basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

// REGISTER OUR ROUTES -------------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);