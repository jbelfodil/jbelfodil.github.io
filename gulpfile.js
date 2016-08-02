//node modules dependencies
var gulp 			= require('gulp'),
	flatten 		= require('gulp-flatten'),
	del 			= require('del'),
	Q 				= require('q'),
	sass 			= require('gulp-sass'),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglify'),
	jshint			= require('gulp-jshint'),
	stylish 		= require('jshint-stylish'),
	imagemin 		= require('gulp-imagemin');

//globals variables
var sourcePath 	= './sources/',
	destPath  	= '.';


//extensions variables
var imgExtensions	= '{png,jpg,svg,gif,ico}';

//sources paths and destinations paths variables
var sassSources 	= sourcePath + 'sass/**/*.scss',
		sassDest 		= destPath + '/css',

		jsSources 		= sourcePath + 'js/**/*.js',
		jsDest 			= destPath + '/js',

		imgSources 		= sourcePath + 'img/**/*.' + imgExtensions,
		imgDest 		= destPath + '/img';


//supported browsers variables
var browsers = [ 'last 3 versions', 'ie 9' ];


//javascript filenames and ordered sources
var jsSrcAndFileName = {

	ltIE9 	: sourcePath + 'node_modules/lt-ie-9/lt-ie-9.js',

	common 	: [
		'./node_modules/jquery/dist/jquery.js',
		'./node_modules/jquery-placeholder/jquery.placeholder.js',
		'./node_modules/progressbar.js/dist/progressbar.js',
		'./node_modules/wowjs/dist/wow.js',
		'./node_modules/jQuery-Form-Validator/form-validator/jquery.form-validator.js',
		'node_modules/jQuery-Form-Validator/form-validator/security.dev.js',
		sourcePath + 'js/**/!(global-init).js',
		sourcePath + 'js/**/*.js',
		sourcePath + 'js/**/!(global-init).js'

	]
};


//clean repository
function cleanDest(dest, cb) {

	del(dest, function (err, deletedFiles) {
		console.log('Files deleted:', deletedFiles.join(', '));
		cb();
	});
}


//compile .scss to .css
function scssToCss(outputStyle) {

	return gulp.src(sassSources)
		.pipe(sass({
			outputStyle: outputStyle,
			errLogToConsole: true
		}))
		.pipe(autoprefixer({
			browsers: browsers
		}))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(sassDest));
}


//clean css repository
gulp.task('clean-css', function(cb) {
	cleanDest(sassDest + 'style.css', cb);
});


//clean js repository
gulp.task('clean-js', function(cb) {
	cleanDest(jsDest , cb);
});


//clean img repository
gulp.task('clean-img', function(cb) {
	cleanDest(imgDest , cb);
});


//compile .scss to .css development environment
gulp.task('css-dev', ['clean-css'], function() {
	return scssToCss('nested');
});


//compile .scss to .css production environment
gulp.task('css-dist', ['clean-css'], function() {
	return scssToCss('compressed');
});


//concat all .js in one
gulp.task('concatJS', ['clean-js'], function() {

	var process = function (src, fileName){
		var deferred = Q.defer();
		gulp.src(src)
			.pipe(concat(fileName + '.js',{
				newLine: '\r\n'
			}))
			.pipe(gulp.dest(jsDest))
			.on("end", function(){
				deferred.resolve();
			});
		return deferred.promise;
	};

	var promiseArray = [];

	for(var key in jsSrcAndFileName){
		promiseArray.push(process(jsSrcAndFileName[key], key));
	}

	return Q.all(promiseArray);

});


//concatane all .js in one and uglify it (production environment)
gulp.task('uglifyJS',['concatJS'], function() {
	return gulp.src(jsDest + '/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(jsDest))
});


//test all .js files with the .jshintrc configuration
gulp.task('jshint', function() {
	gulp.src(jsSources)
		.pipe(jshint()).pipe(jshint.reporter(stylish))
});


//optimize img
gulp.task('imageMin',['clean-img'], function () {
	return gulp.src(imgSources)
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(flatten())
		.pipe(gulp.dest(imgDest));
});


//watch task
gulp.task('watch', function() {
	gulp.watch(sassSources, ['css-dev']);
	gulp.watch(jsSources, ['concatJS']);
	gulp.watch(imgSources, ['imageMin']);
});


//customs tasks
gulp.task('default', ['dev', 'watch']);
gulp.task('dev', ['css-dev', 'concatJS', 'imageMin']);
gulp.task('dist', ['css-dist', 'uglifyJS', 'imageMin']);
gulp.task('cleanAll', ['clean-css', 'clean-js', 'clean-img']);
