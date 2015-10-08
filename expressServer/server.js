//Express solution (less syntax, easier to read)

// load the express package and create our app 
//REM: use , to chain together var definitions
var express = require('express'),
app = express();

// set the port based on environment (more on environments later)
var port    = 1337; 

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// app.route() -> shortened version of getting router instance and apply routes!
//Simple, clean, shorthand for apply routes with different methods
app.route('/login') 

	//GET to show login form (localhost:1337/login)
	.get(function(req, res) {
		res.send('this is the login form');	
	})
	
	//process the same form with POST (REM: SAME ROUTE, DIFFERENT METHOD!)
	.post(function(req, res) {
		console.log('processing...');
		res.send('processing the login form!');
	});

//---------REM: get router instance, apply routes, apply router 
//---------		To app!

//Now Using the router object from express to declare /admin routes
// get an instance of the router
var adminRouter = express.Router();

//Router Middleware ----- REM: place before the path defs you want it 
//							   to come between req/response!

adminRouter.use(function (req, res, next) {
	console.log("Request: " + req.method + "\nURL: " + req.url);
	
	//continue on to response
	next();
});

//PARAM MIDDLEWARE -> only active when parameter with same name passed!
adminRouter.param('name', function(req, res, next, name) {
	//do validation on name object
	console.log("validation: " + req.params.name);
	
	//save the new var into req's name param
	//REM: you can change these as they come thru!
	req.name = name;
	
	//proceed with response
	next();
});


// create routes for the admin section
// admin main page. the dashboard
adminRouter.get('/', function(req, res) {
	res.send('I am the dashboard!');
});

// users page
adminRouter.get('/users', function(req, res) {
	res.send('I show all the users!');
});

//route with parameters
adminRouter.get('/users/:name', function (req, res) {
	res.send('hello ' + req.params.name + "!");
});

// posts page
adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts!');
});

// apply the routes to our application
app.use('/admin', adminRouter);

// start the server
app.listen(1337);
console.log('1337 is the magic port!');