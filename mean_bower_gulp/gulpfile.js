var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

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