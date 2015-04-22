angular.module('sdco-slides.services')
/**
 * @ngdoc service
 * @name sdco-slides.service:slidesConfig
 *
 * @description
 * This service owns some configuration attributes.
 * It's {@link sdco-slides.service:slidesConfig#methods_init init}
 * function has to be called at start.
 * 
 * @example
 * <pre>
 * angular.module('slidesSample', ['sdco-slides'])
 * //Config routes
 * .config(['slidesConfigProvider',
 *   function(slidesConfigProvider){
 *     slidesConfigProvider.applyConf();
 * }])
 * //Init view classes
 * .run(['slidesConfig',  function(slidesConfig){
 *   slidesConfig.init();
 * }]);
 *
 * <p> This service shouldn't be used out of {@link sdco-slides this module} </p>
 **/

 /**
 * @ngdoc service
 * @name sdco-slides.service:slidesConfigProvider
 *
 * @description
 * <p> 
 * Provider of {@link sdco-slides.service:slidesConfig slidesConfig}
 * 	This service can be used to configure some slides behaviors for a new application.
 *  The applyConf method has to be called during the configuration phase.
 * </p> 
 *
 * @example
 * <pre>
 * angular.module('slidesSample', ['sdco-slides'])
 * //Config routes
 * .config(['slidesConfigProvider',
 *   function(slidesConfigProvider){
 *     slidesConfigProvider.applyConf();
 * }])
 * //Init view classes
 * .run(['slidesConfig',  function(slidesConfig){
 *   slidesConfig.init();
 * }]);
 * 
 **/
.provider('slidesConfig', ['$routeProvider','$locationProvider', 'sdcoInfosSlidesService', 'sdcoEditorServiceProvider',
	function($routeProvider, $locationProvider, sdcoInfosSlidesService, sdcoEditorServiceProvider){

	var config= {
		templatesRootPath:'views/partials/'
	};

    /**
    * @ngdoc method
    * @name setTemplatesRootPath
    * @methodOf sdco-slides.service:slidesConfigProvider
    * @description
    * Update the config object by adding the <b>templatesRootPath</b> property
    * for the root path for your templates
    *
    * @param {String} [templatesRootPath='views/partials/'] the root path for your templates
    **/
	this.setTemplatesRootPath= function(templatesRootPath){
		config.templatesRootPath= templatesRootPath;
	};

    /**
    * @ngdoc method
    * @name applyConf
    * @methodOf sdco-slides.service:slidesConfigProvider
    * @description
    * Do all needed configuration steps such as routing...
    **/
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

		    /**
		    * @ngdoc method
		    * @name getConfig
		    * @methodOf sdco-slides.service:slidesConfig
		    * @description
		    * Get the config object
		    *
		    * @returns {Object} the config object
			* 
		    * @example
			* <pre>
			* angular.module('slidesSample', ['sdco-slides'])
			* //Config routes
			* .config(['slidesConfigProvider',
			*   function(slidesConfigProvider){
			*     slidesConfigProvider.applyConf();
			* }])
			* //Init view classes
			* .run(['slidesConfig',  function(slidesConfig){
			*   slidesConfig.init();
			* }]);
		    **/
			this.getConfig= function(){
				return config;
			};

		    /**
		    * @ngdoc method
		    * @name init
		    * @methodOf sdco-slides.service:slidesConfig
		    * @description
		    * Initialize all internal services which has to be initialized at start
		    *
		    * @returns {Object} the config object
		    **/
			this.init= function(){
				sdcoAnimationManagerService.init();
				sdcoSlidesNavigatorService.init();
				sdcoNotesService.init();		
			};

		};

		return new SlidesConfig();
	}];

}]);