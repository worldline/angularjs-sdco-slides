

var argv= require('yargs').argv,
	fs= require('fs');

//MANDATORY FLAG
var acceptableFlags=['standalone', 'template'];
var isStandalone= argv[acceptableFlags[0]];
var isTemplate= argv[acceptableFlags[1]];

//DEFINE DEST FOLDER
var destFolder= ( isTemplate? './dist/template' : './dist/standalone' );

//INIT TEMPLATE VALUES
var templatekeywords={
	appName:{ tag:'app_name', defaultValue:'blogApp' },
	appTitle:{ tag:'app_title', defaultValue:'appTitle' },
	appVersion:{ tag:'app_version', defaultValue:'1.0.0' },
	appStylesheets:{ tag: 'app_stylesheets', defaultValue: 'styles/sdco-slides.css'},
	appServices:{tag:'app_js', defaultValue: 'js/sdco-slides.js' },
	appExtStylesheets:{tag:'ext_stylesheets', defaultValue: 'styles/ext.css'},
	appExtJs:{tag:'ext_js', defaultValue: 'js/ext.js'}
}

var requireJSON= function (filePath) {
		return JSON.parse(fs.readFileSync(filePath, "utf8"));
}


var myutilmodule= {

	destFolder: destFolder,

	isStandalone:  isStandalone,

	isTemplate: isTemplate,

	checkFlags: function(){
		return (argv[acceptableFlags[0]] || argv[acceptableFlags[1]]);
	},

	checkFlagsMessage: function(){
		return 'Need one of the following flag: --' + acceptableFlags[0] + ' | --' + acceptableFlags[1];
	},

	appPathes:{
		js:'/public/js/',
		styles:'/public/styles/',
		index:'/public/index.html',
		npm_package:'/package.json',
	},

	globalGlobs: [
		'**/*.template','**/*.js','**/*.css', 
		'**/*.jpg', '**/*.png', '**/*.gif', 
		'**/*.html', '**/*.json', 'package.json',
		'!dist', '!public/js/libs/**/*'
	],

	//GET GLOBS, WITH TEMPLATE EXTENSION OR NOT
	getGlobsByType: function(templatedOnly){

		var makeTemplated= function(globs){
			for (var i in globs){
				globs[i]+= '.template';
			}
		}

		var res= {
			jsGlobs: [
				'public/js/controllers/*.js', 'public/js/services/*.js', 
				'public/js/directives/*.js', 'public/js/app.js'],
			cssGlobs: [
				'public/styles/sdco-slides-stylesheets-animations.css',
				'public/styles/sdco-slides-stylesheets-main.css'],
			dataGlobs: [
				'public/data/slides.json' ],
			resources: [ 
				'public/favicon.ico', 'public/**/*.html', 
				'public/imgs/*',  'package.json', 'server.js']
		}

		if (templatedOnly){
			for (var currentGlobs in res){
				makeTemplated(res[currentGlobs]);
			}
		}

		return res;
	},

	getTemplateOpts: function(){
		var res= {}
		for (var i in templatekeywords){
			currentTemplate= templatekeywords[i];
			res[currentTemplate.tag]= currentTemplate.defaultValue;
		}

		// console.log(res);
		return res;
	},

	bowerrc: requireJSON('.bowerrc'),

	getBowerBaseFolder: function(){
		return this.bowerrc.directory;
	}

}


module.exports= myutilmodule;