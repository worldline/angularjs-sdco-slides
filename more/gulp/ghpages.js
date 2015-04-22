var gulp= require('gulp'),
  debug= require('gulp-debug'),
  gutil= require('gulp-util'),
  rimraf= require('gulp-rimraf'),
  uglify= require('gulp-uglify'),
  cssmin= require('gulp-minify-css'),
  concat= require('gulp-concat'),
  usemin=require('gulp-usemin'),
  gdocs= require('gulp-ngdocs'),
  myUtils= require('./utils');

var globs= myUtils.globs,
    appJsGlobs=globs.appJsGlobs,
    sampleJsGlobs=globs.sampleJsGlobs,
    appCssGlobs= globs.appCssGlobs,
    appImages= globs.appImages;  

var ghpages='ghpages';

//MANAGE GHPAGES CONTENT
gulp.task('clean', function (cb) {

  return gulp.src('./' + ghpages)
  .pipe(rimraf({force:true}));

});


gulp.task('ngdocs', ['clean'], function(cb){

  console.log(__dirname);

  return gulp.src(appJsGlobs)
  .pipe(gdocs.process())
  .pipe(gulp.dest('./' + ghpages + '/doc/'));

});

gulp.task('usemin', ['clean'], function(){

  var sampleBase= 'src/sample/',
      index= sampleBase + 'index.html';

  return gulp.src(index)
  .pipe(usemin({
    ext_css: [cssmin(), 'concat'],
    lib_css: [cssmin(), 'concat'],
    ext_js: [uglify(), 'concat'],
    lib_js: [uglify(), 'concat'],
    app_js: [uglify(), 'concat']
  }))
  .pipe(gulp.dest('./' + ghpages + '/sample/'))

});

gulp.task('copySampleResources', ['clean'], function(){

  var sampleBase= 'src/sample/',
      resourcesGlobs= [
        sampleBase + 'data/**/*', 
        sampleBase + 'views/**/*', 
        sampleBase + 'favicon.ico'
      ];

  return gulp.src(resourcesGlobs, {base:sampleBase})
  .pipe(gulp.dest('./' + ghpages + '/sample/'));
});

gulp.task('copyLibResources', ['clean'], function(){

  var libBase= 'src/lib/',
      resourcesGlobs= [libBase + 'imgs/**/*']

  return gulp.src(resourcesGlobs, {base:libBase})
  .pipe(gulp.dest('./' + ghpages + '/sample/'));
});


gulp.task('copyResources', ['copySampleResources', 'copyLibResources'], function(cb){
  cb();
});


gulp.task('ghpages', ['ngdocs', 'usemin', 'copyResources']);
gulp.task('default', ['ghpages']);
