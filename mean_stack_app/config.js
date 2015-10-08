module.exports = {
	'port' : process.env.PORT || 8080, // set the port for our app
	'secret' : 'superSecretPasswordsecretThing', //used in creation of JWT tokens
   'database' : 'mongodb://localhost:27017/nodeAPI'
}