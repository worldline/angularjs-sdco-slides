var _= require('underscore'),
	glob=require('glob'),
  	express = require('express'),
  	http = require('http'),
  	logger= require('morgan'),
  	baseProject= __dirname + '/../../';

var exports={

	globs: {
		appJsGlobs: ['src/lib/js/**/*.js'],
    	sampleJsGlobs: ['src/sample/js/app.js'],
    	unitTestJsGlobs: ['test/unit/utils.js','test/unit/**/*Spec.js'],
    	e2eJsGlobs: ['test/e2e/**/*.js'],
    	appCssGlobs: ['src/lib/styles/**/*.css'],
    	appImages: ['src/lib/imgs/**/*']
	},

	getFilesForPatterns: function(patterns){
	  return _.chain(patterns)
	  .map(function(pattern){return glob.sync(pattern); })
	  .reduce(function(memo, num){
	    return memo.concat(num);
	  }, []).value();
	},

	getServer: function(){
	  return http.createServer(express()
	  	//.use(logger())
	    .use(express.static(baseProject + '/src/lib'))
	    .use(express.static(baseProject + '/src/sample'))
	    .use(express.static(baseProject + '/bower_components/'))
	  );
	},

	getPackage: function(){
		return require(baseProject +'/package.json');
	},

	getHeaders: function(){
		var cpackage= exports.getPackage(),
			author= cpackage.author,
			version= cpackage.version,
			authorTemplate= '/* Author: ' + author.name + '<' + author.email + '> */\n',
			versionTemplate= '/* Version: ' + version + ' */\n',
			endTemplate= '\n\n',
			template= authorTemplate + versionTemplate + endTemplate;

		return template;
	}

};

module.exports=exports;