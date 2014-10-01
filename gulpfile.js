// including plugins
var gulp= require('gulp'),
	gutil = require('gulp-util'),
	uglify= require("gulp-uglify"),
	cssmin= require("gulp-minify-css"),
	concat= require("gulp-concat"),
	rename= require("gulp-rename"),
	clean = require('gulp-clean'),
	template= require('gulp-template'),
	gulpif = require('gulp-if'),
	debug= require('gulp-debug'),
	gfilter= require('gulp-filter'),
	myutils= require('./gulp-more/utils.js');



gulp.task('checkFlags', function(cb){

	if (! myutils.checkFlags()){
		gutil.log(gutil.colors.red(myutils.checkFlagsMessage()));
		cb('please check your flags...');
	}

	cb();
})

//clean dist/(type) folder
gulp.task('clean', ['checkFlags'], function(cb){
	return gulp.src(myutils.destFolder, {read: false}).pipe(clean());
});


//Place all needed files  them in the dist folder
gulp.task('getResources', ['clean'], function(cb){


	//RETRIEVE STANDARD AND TEMPLATED GLOBS, 
	// WILL BE USED AS FILTERS ON THE GLOBAL GLOBS
	var globs= myutils.getGlobsByType(false),
		templatedGlobs= myutils.getGlobsByType(true);

	//CONCATENATE THEM BY TYPE
	var jsFilter= gfilter(globs.jsGlobs.concat(templatedGlobs.jsGlobs)),
		cssFilter= gfilter(globs.cssGlobs.concat(templatedGlobs.cssGlobs)),
		resourcesFilter= gfilter(globs.resources.concat(templatedGlobs.resources)),
		dataFilter= gfilter(globs.dataGlobs.concat(templatedGlobs.dataGlobs));

	var imgsExtensions= ['.jpg', '.png', '.gif'];

	return gulp.src(myutils.globalGlobs)
	// .pipe(debug({title:'allREsources:'}))
	.pipe(jsFilter) //JS
	.pipe(rename(function(path){path.dirname=''}))
	// .pipe(debug({title:'## JS ##'}))
	.pipe(gulp.dest(myutils.destFolder + myutils.appPathes.js))
	.pipe(jsFilter.restore())
	.pipe(cssFilter) //CSS
	.pipe(rename(function(path){path.dirname=''}))
	// .pipe(debug({title:'## CSS ##'}))
	.pipe(gulp.dest(myutils.destFolder + myutils.appPathes.styles))
	.pipe(cssFilter.restore())
	.pipe(resourcesFilter) //RESOURCES
	// .pipe(debug({title:'## RESOURCES ##'}))
	.pipe(gulp.dest(myutils.destFolder))
	.pipe(resourcesFilter.restore())
	.pipe(dataFilter) // DATA
	// .pipe(debug())
	.pipe(gulp.dest(myutils.destFolder));

});

//Remove templates or replace original files by template ones
gulp.task('applyOrRemoveTemplates', ['getResources'], function(cb){

	var stillReplaceResourcesFilter= gfilter(['**/index.html.template', 'package.json.template']),
		remainingResourcesFilter= gfilter(['**/*.template', '!index.html.template', '!package.json.template']);

	return gulp.src(myutils.destFolder + '/**/*.template')
	//TREAT INDEX TEMPLATE ONLY
	.pipe(stillReplaceResourcesFilter)
	//REMOVE TEMPLATE FILE AT END
	.pipe(clean()) 
	// REPLACE SOME RESOURCSE BY THEIR TEMPLATE 
	// (INDEX.HTML AND PACKAGE.JSON FOR NOW)
	.pipe(rename(function(path){path.extname= ''})) 
	//WRITE THE RES
	.pipe(gulp.dest(myutils.destFolder)) 
	.pipe(stillReplaceResourcesFilter.restore()) 
	//TREAT ALL TEMPLATES BUT INDEX
	.pipe(remainingResourcesFilter) 
	//REMOVE ALL TEMPLATES
	.pipe(clean()) 
	//IF TEMPLATE MODE, REPLACE ORIGINAL FILES BY THEIR TEMPLATES
	.pipe(gulpif(myutils.isTemplate,rename(function(path){path.extname= ''}))) 
	//AND WRITE THE RES
	.pipe(gulpif(myutils.isTemplate, gulp.dest(myutils.destFolder))); 
});


// minify js
gulp.task('minifyJs', ['applyOrRemoveTemplates'], function () {

	var target_name='sdco-slides';

    gulp.src(myutils.destFolder + myutils.appPathes.js + '*.js') 
    .pipe(clean())
    .pipe(concat( target_name + '.js'))
    .pipe(gulp.dest( myutils.destFolder + myutils.appPathes.js)) //not minified
    .pipe(uglify())
    .pipe(rename(target_name + '-min.js'))
    .pipe(gulp.dest( myutils.destFolder + myutils.appPathes.js)); //minified
});

//minify css
gulp.task('minifyCss',  ['applyOrRemoveTemplates'], function () {
	var target_name= 'sdco-slides';

    gulp.src(myutils.destFolder + myutils.appPathes.styles + '*.css')
    .pipe(clean())
    .pipe(concat(target_name + '.css'))
    .pipe(gulp.dest( myutils.destFolder + myutils.appPathes.styles)) //not minified
    .pipe(cssmin())
    .pipe(rename(target_name + '-min.css'))
    .pipe(gulp.dest( myutils.destFolder + myutils.appPathes.styles)); //minified
});


gulp.task('makeIndex', ['applyOrRemoveTemplates'], function(){

	var globs= [
		myutils.destFolder + '/**/index.html',
		myutils.destFolder + myutils.appPathes.npm_package
	];

	gulp.src(globs)
	// .pipe(debug())
	.pipe( gulpif(
		myutils.isStandalone,
		template(myutils.getTemplateOpts())
	))
	.pipe(gulp.dest(myutils.destFolder));
});

gulp.task('default', ['minifyJs', 'minifyCss', 'makeIndex']);