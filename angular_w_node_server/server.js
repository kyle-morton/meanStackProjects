//get express and port
var express = 	require('express');
var app 	= express();
var path 	= require('path');
var port 	= 8080;

//set public folder
//whenever js, css requested, comes from public folder
app.use(express.static(__dirname + '/public'));

//set up entry route
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'))
});

//start server
app.listen(port);
console.log("Magic happens on port " + port);