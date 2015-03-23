angular.module('sdco-slides.services')
.provider('slidesConfig', ['$routeProvider','$locationProvider', 'sdcoInfosSlidesService', 'sdcoEditorServiceProvider',
	function($routeProvider, $locationProvider, sdcoInfosSlidesService, sdcoEditorServiceProvider){

	var config= {
		templatesRootPath:'views/partials/'
	};

	this.setTemplatesRootPath= function(templatesRootPath){
		config.templatesRootPath= templatesRootPath;
	};


	this.applyConf= function(){

		var firstSlideUrl;

		angular.forEach(sdcoInfosSlidesService.templates, function(value, index){
			var url= '/slide' + (index+1),
		    template= config.templatesRootPath + value + '.html';
		    if (index === 0){
		    	firstSlideUrl= url;
		    }
			$routeProvider.when( url, {templateUrl: template });
		});

		$routeProvider.otherwise({redirectTo: firstSlideUrl});
		$locationProvider.html5Mode(false);
      	sdcoEditorServiceProvider.isStorageActive= true;
	};


	this.$get= ['sdcoAnimationManagerService','sdcoSlidesNavigatorService','sdcoNotesService',
	function(sdcoAnimationManagerService,sdcoSlidesNavigatorService, sdcoNotesService){

		var SlidesConfig= function(){

			this.getConfig= function(){
				return config;
			};

			this.init= function(){
				sdcoAnimationManagerService.init();
				sdcoSlidesNavigatorService.init();
				sdcoNotesService.init();		
			};

		};

		return new SlidesConfig();
	}];

}]);