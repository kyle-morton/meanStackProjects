/* 
	REM: Gulp is pretty much ANT, task runner, allows you to automate tasks easily
*/



var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint'); //used for linting js files
var concat = require('gulp-concat'); //used to concat js files together
var uglify = require('gulp-uglify'); //used to minify js files
var ngAnnotate = require('gulp-ng-annotate'); //used specifically for minifying Angular files
var nodemon = require('gulp-nodemon'); //used to start node server

//define task
gulp.task('css', function() {
	
	//take out min and rename to get dev CSS,
	//add to get min version
	
	//grab the less file, process, save to style.css (Compile it and save in css)
	return gulp.src('public/assets/css/style.less') //Grab
		.pipe(less()) 								//compile
		.pipe(minifyCSS())							//minify
		.pipe(rename({suffix: '.min'}))				//add .min to suffix
		.pipe(gulp.dest('public/assets/css'));		//save css
	
	
});


//linting js task
gulp.task('js', function() {
	return gulp.src(['server.js',
					 'public/app/*.js',
					 'public/app/**/*.js'])
					 .pipe(jshint())
					 .pipe(jshint.reporter('default'));
});

//used to minify angular, node, etc js, concat, then save to dist folder as 1 js file
gulp.task('angular', function() {
	return gulp.src(['server.js',
					 'public/app/*.js',
					 'public/app/**/*.js'])
					 .pipe(jshint())                   //lint JS for errors
					 .pipe(jshint.reporter('default')) // " "
					 .pipe(ngAnnotate())			   //this minifies angular regardless of style
					 .pipe(concat('all.js'))		   //concat all js files together (all.js)
					 .pipe(uglify())				   //minify results
					 .pipe(gulp.dest('public/dist'));  //save in dist folder
});

//Run -> gulp watch. after finishes will sit and wait for new changes then run whatever tasks
//declared below.

//create gulp 'watch' task to sit and wait for changes to files, then run the tasks automatically
gulp.task('watch', function() {
	
	//watch the less file for changes
	gulp.watch('public/assets/css/style.less', ['css']); //2nd arg is array of tasks to run!
	
	//watch js files
	gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], //1st arg -> files to watch (array or single file)
			   ['js', 'angular']); //2nd arg -> tasks to run in order
	
	
});

//node task to start node server
gulp.task('nodemon', function() {
	nodemon({
		script: 'server.js', //starting scripts
		ext: 'js less html'  //types of files to watch for changes
	})
		//create event handlers for start, change, restart of server
		.on('start', ['watch']) //on start -> run watch task
		.on('change',['watch'])
		.on('restart', function() {
			console.log("restarted!");
		});
		
	
});

//Define main gulp task to run by default when you just type 'gulp'
gulp.task('default', ['nodemon']);