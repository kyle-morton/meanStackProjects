// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var User       = require('./app/models/user');
var port       = process.env.PORT || 8080; // set the port for our app
var User 	   = require('./app/models/user'); //get User schema

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
mongoose.connect('mongodb://localhost:27017/nodeAPI');

// ROUTES FOR OUR API
// ======================================

// basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

// get an instance of the express router
var apiRouter = express.Router();

//ALL API requests middleware 
//REM: Middleware useful for logging,
//validation, error checking in request body, etc
apiRouter.use(function(req, res, next) {
	console.log("New request to API");
	
	next(); //allow to proceed with request
});

// test route to make sure everything is working 
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

//create route then apply new methods!
apiRouter.route('/users')

	.post(function(req, res) {
		//create new user
		var user = new User();
		
		//set user info that came in req
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;
		
		user.save(function(err) { //use built in save to send user to MDB
			
			if (err) { //if error, handle appropriately
				if (err.code == 11000) { //tried to create duplicate entry
					return res.json({ success: false, message: 'A user with that username already exists. '});
				}
				else {
					return res.send(err);
				}
			
			}
			//no error, user created
			res.json({message: 'User Created!'});
			
		});
		
	}) //end POST
	
	.get(function(req, res) {
		//REM: mongoose model is collection object! 
		//you can run queries just using model name
		
		//find takes callback -> takes err object or list of 
		//docs returned from query
		User.find(function(err, users) {
			if (err) {
				res.send("ERROR: " + err);
			} else {
				res.json(users);
			}
		})
		
	});
	
//Sample middleware for all routes with /:user_id
apiRouter.param('user_id',function(req, res, next) {
	console.log("API Request For Particular User: " + req.params.user_id);
	
	//if id sent in request, proceed
	if (typeof req.params.user_id !== "undefined") {
		next();
	} else { //otherwise, alert in response
		res.json({message: "No Id Passed In Request"});
	}
	
	
})

apiRouter.route('/users/:user_id')

	//GET user with the id given
	.get(function(req, res) {
		
		//REM: mongoose model is collection object!
		//retrieve user by the user_id param in request object!
		User.findById(req.params.user_id, function(err, user) {
			
			if (err) {
				res.send("ERROR: " + err);
			} else {
				res.json(user);
			}
			
		});
		
	}) //end GET
	
	//PUT (update) user with id given
	.put(function(req, res) {
		//get the user object id 
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send("ERROR: " + err);
			
			//update users info ONLY if new (if sent in request body)
			if(req.body.name) {user.name = req.body.name;}
			if(req.body.username) {user.username = req.body.username;}
			if(req.body.password) {user.password = req.body.password;}
			
			//save the user object 
			user.save (function(err) {
				if (err) res.send("ERROR: " + err);
				
				res.json({message: "User Updated"});
			});
			
			
			
		});
	})
	
	//DELETE user with given id
	.delete(function(req, res) {
		//REM: pass in json object for query -> match _id to req id
		User.remove({_id : req.params.user_id}, function(err, user) {
			if (err) res.send("ERROR: " + err);
			
			res.json({message: "User Deleted!"});
			
		})
	})


// REGISTER OUR ROUTES -------------------------------
app.use('/api', apiRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);