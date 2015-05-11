/* Author: Legrand Régis<regis.legrand@worldline.com> */
/* Version: 1.0.2 */


/**
 * @ngdoc overview
 * @name sdco-slides
 *
 * @description
 * <p>
 * Easy to use module allowing to easily create new slides.
 * </p>
 **/
angular.module('sdco-slides', ['sdco-slides.directives', 'sdco-slides.services'])
.config(['$provide', function($provide){

	//Decorate the progress directive
	$provide.decorator('progressDirective', ['$delegate',function($delegate){
		var directive= $delegate[0];
		directive.$$isolateBindings.max = {
          attrName: 'max',
          mode: '=',
          optional: false
        };
		$delegate[0].scope= {max:'='};
		return $delegate;
	}]);
}]);
angular.module('sdco-slides.directives', []);
angular.module('sdco-slides.directives')
 /**
 * @ngdoc directive
 * @name sdco-slides.directive:sdcoMoveSlide
 * @restrict A
 * @scope
 *
 * @description
 * <p>
 * Used internally only.
 * Listen for click on the element it is used on,
 * and update the binded index by decrementing it if left is true, 
 * or incrementing it if right is true
 * </p>
 * <h2> Remark </h2>
 * <p>
 * The index is used gloablly in the application and corresponds to the current slide index
 * </p>
 *
 * @param {Boolean} left if true, the index will be decremented
 * @param {Boolean} right if true, the index will be incremented
 * @param {int} currentIndex the binded index
 * @param {function} action a callback to call each time the element is clicked
 **/ 
.directive('sdcoMoveSlide',[ '$log',
	function($log){
		return{
			restrict: 'A',
			scope:{
				left:'=left',
				right:'=right',
				currentIndex:'=',
				action:'&'
			},
			link:function(scope, element, attrs){

				element.on('click',function(e){
					e.preventDefault();
					scope.$apply(function(){
						scope.action();
						if (scope.right===true){
				    		scope.currentIndex++;
						}else if (scope.left===true){
				    		scope.currentIndex--;
						}
					});
				});
			}
		};
	}
]);
angular.module('sdco-slides.directives')
 /**
 * @ngdoc directive
 * @name sdco-slides.directive:sdcoUpdatableProgressBar
 * @restrict E
 * @scope
 *
 * @description
 * <p>
 * Used internally only.
 * Add a progress bar describing the advancement of slides.
 * It is the possible to click on the bar to go to a specific slide.
 * </p>
 * 
 * @param {Array} theArray the array containing slides data.
 * Should be replaced by an integer later.
 *
 * @param {int} currentIndex the binded index
 *
 * @param {String} [progressBarDisplay=global] 'all' if you want to display the slides numbers 
 * directly in the bar or 'global' if you want a global pager to be added
 **/
.directive('sdcoUpdatableProgressBar', ['$rootScope',

	function($rootScope){
		return{
			restrict:'E',
			replace: true,
			scope:{
				theArray:'=',
				currentIndex:'=',
				progressBarDisplay:'@'
			},
			template:' ' +
			'<span> ' +
			'<div' +
			'	class="col-sm-11" ' +
			'	style="padding-right: 0px; padding-left: 0px;"' +
			'>' +
			'	<progress max="theArray.length"> '+
			'		<bar value="currentIndex+1" type="success"> ' +
		    '		     <div ' +
		    '			   class="progress-sub-parts"' +
		    '		       style="width:{{getSuccessElementsSize()}};" ' +
		    '		       ng-repeat="slide in getSuccessSlides()" ' +
		    '		       tooltip="{{getTooltip($index)}}" ' +
		    '		       tooltip-placement="bottom" ' +
		    '		       ng-click="goToSlide($index)" ' +
		    '		     > ' +
		    '		     {{getSuccessSlidePagingLabel()}} ' +
		    '		     </div> ' +
			'		</bar> ' +
        	'		<bar value="theArray.length-currentIndex-1" type="danger"> ' +
          	'			<div ' +
		    '			   class="progress-sub-parts"' +
            '				style="width:{{getDangerElementsSize()}}" ' +
            '				ng-repeat="slide in getDangerSlides()" ' +
            '				tooltip="{{getTooltip(currentIndex+1+$index)}}" ' +
            '				tooltip-placement="bottom" ' +
            '				ng-click="goToSlide(currentIndex+1+$index)" ' +
          	'			> ' +
          	'				{{getDangerSlidePagingLabel()}} ' +
          	'			</div> ' +
          	'		</bar> ' +
			'	</progress> ' +
			'</div> ' +
			'<span class="global-paging"> {{getGlobalPagingLabel()}} </span>' +
			'</span> ' ,
			link:function($scope, element, attrs){

			    $scope.getTooltip= function(index){
			    	return 'slide' + (index + 1) + '(' + $scope.theArray[index] + ')';
			    };

			    $scope.goToSlide= function(index){
			      $scope.currentIndex= index;
			    };

			    $scope.getSuccessSlides= function(){
			      var start= 0;
			      var end= $scope.currentIndex+1;
			      $scope.sucesSlides= $scope.theArray.slice(start,end);
			      return $scope.sucesSlides;
			    };

			    $scope.getDangerSlides= function(){
			      var start= $scope.currentIndex+1;
			      var end= $scope.length;
			      $scope.dangerSlides= $scope.theArray.slice(start,end);
			      return $scope.dangerSlides;
			    };

			    $scope.getSuccessElementsSize= function(){
			      if ($scope.sucesSlides){
			        return 100/$scope.sucesSlides.length + '%';
			      }
			      return 0;
			    };

			    $scope.getDangerElementsSize= function(){
			      if ($scope.sucesSlides){
			        return 100/$scope.dangerSlides.length + '%';
			      }
			      return 0;
			    };


			    $scope.getSuccessSlidePagingLabel= function(index){
					return ($scope.progressBarDisplay=='all'?$scope.$index + 1:'');
			    };

			    $scope.getDangerSlidePagingLabel= function(index){
					return ($scope.progressBarDisplay=='all'?$scope.$index + 1 + $scope.currentIndex:'');
			    };

			    $scope.getGlobalPagingLabel= function(index){
			    	if ($scope.sucesSlides && $scope.progressBarDisplay == 'global'){
			    		return $scope.sucesSlides.length + '/' + $scope.theArray.length;
			    	}
			    };

			}

		};
	}


]);
angular.module('sdco-slides.directives')
 /**
 * @ngdoc directive
 * @name sdco-slides.directive:sdcoSlidesGoTo
 * @restrict A
 * @scope
 *
 * @description
 * <p>
 * Listen for click on the element it is used on,
 * and go to the slides targeted by 'dest'
 * </p>
 *
 * @param {Integer} dest the index of the slide to go to
 **/ 
.directive('sdcoSlidesGoTo',[ '$log', '$rootScope', 'sdcoSlidesNavigatorService',
	function($log, $rootScope, sdcoSlidesNavigatorService){
		return{
			restrict: 'A',
			scope:{
				dest:'@'
			},
			link:function(scope, element, attrs){

				element.on('click',function(e){
					e.preventDefault();
					scope.$apply(function(){
				    	$rootScope.currentIndex= parseInt(scope.dest) - 1;
					});
				});
			}
		};
	}
]);
angular.module('sdco-slides.directives')
 /**
 * @ngdoc directive
 * @name sdco-slides.directive:sdcoSlidesKeydown
 * @restrict A
 * @scope
 *
 * @description
 * <p>
 * Used internally only.
 * Listen for left and right keydowns and update the binded index by incrementing 
 * it for right keydown and decrementing it for left keydown.
 * </p>
 * <h2> Remark </h2>
 * <p>
 * The index is used gloablly in the application and corresponds to the current slide index
 * </p>
 *
 * @param {int} currentIndex the binded index
 **/
.directive('sdcoSlidesKeydown',[ '$log',
	function($log){
		return{
			restrict: 'A',
			scope:{
				currentIndex:'='
			},
			link:function(scope, element, attrs){

				//Make the element selectable
				angular.element('body').on('keydown',function(e){
					scope.$apply(function(){
						if (e.keyCode == 37){//left
							scope.currentIndex--;
						}
						else if (e.keyCode == 39){//right
							scope.currentIndex++;
						}
					});
				});
			}
		};
	}

]);
angular.module('sdco-slides.directives')
 /**
 * @ngdoc directive
 * @name sdco-slides.directive:sdcoSlidescontainer
 * @restrict E
 *
 * @description
 * The directive which owns the whole application.
 * Add this directive in your DOM to display the slides you have defined.
 *
 * @param {String} heading the title of the tab
 *
 * @example
 * <pre>
 * <sdco-editor compile="false" compile-on-demand="true" js-fiddle="true">
 *  <sdo-editor-tab type="html" heading="index.html">
 *   &lt;p&gt; id="elt" my escaped html content &lt/p&gt;
 *  </sdco-editor-tab>
 *  <sdo-editor-tab type="javascript" heading="main.js">
 *   document.getElementById('elt').innerText='changed';
 *  </sdco-editor-tab> 
 *  <sdo-editor-tab type="css" heading="main.css">
 *   p{
 *	  color: red;
 *   }
 *  </sdco-editor-tab>
 * </sdco-editor>
 * </pre>
 **/
.directive('sdcoSlidescontainer', ['$window', '$timeout', 
   '$log', '$rootScope', 'sdcoInfosSlidesService', 'sdcoSlidesNavigatorService', 'sdcoEditorService',
   function($window, $timeout, $log, $rootScope, sdcoInfosSlidesService, 
   			sdcoSlidesNavigatorService,  sdcoEditorService){

	   	return {
			restrict:'E',
			replace: true,
			template:''+
				'<div sdco-slides-keydown current-index="currentIndex">' +
				'	<nav>' +
				'		<h1> <a>navigation features</a> </h1>' +
				'		<div class="row" style="margin-left:5px; margin-right: 0;">' +
				'			<sdco-updatable-progress-bar' +
				'				the-array="slides"' +
				'				current-index="currentIndex"' +
				'				progress-bar-display="{{progressBarDisplay}}" ' +
				'			></sdco-updatable-progress-bar>' +
				'			<sdco-notes-export></sdco-notes-export>' +
				'		</div>' +
				'		<button sdco-move-slide ' +
				'			left="true" class="left-link" ' +
				'			current-index="currentIndex" ' +
				'		/>' +
				'		<button sdco-move-slide ' +
				'			right="true" class="right-link" ' +
				'			current-index="currentIndex"' +
				'		/>' +
				'	</nav>' +
				'	<div ' +
				'		ng-view ' +
				'		sdco-view-size ' +
				'		ng-class="slideClasses" ' +
				'		ng-style="slideStyles" ' +
				'		class="view-content"' +
				'	>' +
				'	</div>' +	
				'</div>' +
		'',
			link: function($scope, $element, $attrs){

				$rootScope.currentIndex= sdcoSlidesNavigatorService.getIndex();
			    sdcoSlidesNavigatorService.indexCallback= function(index){
			      $rootScope.currentIndex= index;
			    };

			    //Watch currentIndex to go to the specified slide
			    $rootScope.$watch('currentIndex', function(newValue, oldValue){
			        if (newValue !== undefined){
			            $rootScope.currentIndex= sdcoSlidesNavigatorService.goToIndex(newValue);
			        }
			    });				

				$scope.progressBarDisplay= $attrs.progressBarDisplay;

			    $scope.slides= sdcoInfosSlidesService.templates;

			    $scope.action= function(){ 
			      sdcoEditorService.toDom();
			      sdcoEditorService.reset();
			    };		    

			}
		};
}]);
angular.module('sdco-slides.directives')
 /**
 * @ngdoc directive
 * @name sdco-slides.directive:sdcoMoveSlide
 * @restrict A
 *
 * @description
 * Update custom styles based on the screen size
 **/ 
.directive('sdcoViewSize', ['sdcoAnimationManagerService', function(animationService){

	return {
		restrict:'A',
		link:function($scope, $element, $attrs){
			animationService.updateCustomStyles({width:Math.floor($element.width()) + 'px'});
		}
	};
}]);
angular.module('sdco-slides.services', ['ngRoute','ngAnimate', 'ngSanitize','ui.bootstrap','sdco-tools']);
angular.module('sdco-slides.services')
/**
 * @ngdoc service
 * @name sdco-slides.service:sdcoAnimationManagerService
 *
 * @description
 * 
 * <p> 
 *  This service is used (mainly internally) to help managing animations
 *  by setting custom class and styles used in the view depending
 *  on user actions.
 * </p>
 **/
.service('sdcoAnimationManagerService', ['$rootScope', function ($rootScope){

    this.animationsClasses=['slide-animate'];
    this.currentAnimationIdx= 0;
    var that= this;

    this.animations={
      'slide-animate-right': true,
      'slide-animate-left': false
    };


    this.customStyles={};


    this.init= function(){
        $rootScope.slideClasses= this.animations;
        $rootScope.slideStyles= this.customStyles;
    };

    /**
    * @ngdoc method
    * @name updateCustomStyles
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Dynamically update the styles of the view
    * 
    * @param {Object} newStyles an object of  css properties
    **/
    this.updateCustomStyles= function(newStyles){
        angular.forEach(newStyles, function(val, key){
            that.customStyles[key] = val;
        });
    };

    /**
    * @ngdoc method
    * @name applyRight
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Apply needed classes for a right slide move (automatically called)
    **/
    this.applyRight= function(){
        this.apply('right');
    };

    /**
    * @ngdoc method
    * @name applyLeft
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Apply needed classes for a left slide move (automatically called)
    **/
    this.applyLeft= function(){
        this.apply('left');
    };

    /**
    * @ngdoc method
    * @name apply
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Apply a suffix on animation classes
    *
    * @param {String} suffix the suffix to apply
    **/
    this.apply= function(suffix){
        // var that= this;
        var classToSet= that.animationsClasses[that.currentAnimationIdx] + '-' + suffix;
        jQuery.each(that.animations, function(key, value){
            that.animations[key]= false;
        });
        that.animations[classToSet]= true;
    };


    this.getAnimations= function(){
        return this.animations;
    };

    this.setAnimation= function(idx){
        this.currentAnimationIdx= idx;
    };

}]);
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
angular.module('sdco-slides.services')
/**
 * @ngdoc service
 * @name sdco-slides.service:sdcoInfosSlidesService
 *
 * @description
 * The json slides object.
 **/
.constant(
	'sdcoInfosSlidesService', 
	(
		function(){

			var res= null;

			$.ajax({
				type: 'GET',
				url: 'data/slides.json',
				dataType: 'json',
				data: {},
				success: function(data){res= data;},
				async: false
			});

			return res;
		}
	)()
);
angular.module('sdco-slides.services')
/**
 * @ngdoc service
 * @name sdco-slides.service:sdcoSlidesNavigatorService
 *
 * @description
 * Make the glue between the index and the view: update the route based on the index
 * and reciprocally
 **/
.service('sdcoSlidesNavigatorService', ['sdcoInfosSlidesService', 'sdcoAnimationManagerService','$location', '$rootScope', 
function (sdcoInfosSlidesService, sdcoAnimationManagerService, $location, $rootScope){

	this.nbSlides= sdcoInfosSlidesService.templates.length;
	this.nextRoute= '/';
	this.indexCallback= undefined;

    /**
    * @ngdoc method
    * @name increment
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Increment the index if possible and go to the associated view
    **/
	this.increment= function(){
		return this.goToIndex(this.index+1);		
	};

    /**
    * @ngdoc method
    * @name decrement
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Decrement the index if possible and go to the associated view
    **/
	this.decrement= function(){
		return this.goToIndex(this.index-1);
	};

    /**
    * @ngdoc method
    * @name goToIndex
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Update the index if possible and go to the associated view accordingly
    *
    * @param {int} idx the index to go to
    **/
	this.goToIndex= function(idx){
		if (idx<0){
			return 0;
		} 
		if(idx+1>this.nbSlides){
			return this.nbSlides-1;
		}

		var increment= idx>this.index;
		var decrement= idx<this.index;
		var stayOnPage= (idx == this.index);

		if (stayOnPage){
			return idx;
		}

		this.index=idx;
		if (increment){
			sdcoAnimationManagerService.applyRight();
		}else if (decrement){
			sdcoAnimationManagerService.applyLeft();
		}

		this.nextRoute= 'slide' + (this.index+1);
		$location.url(this.nextRoute);
		return idx;	
	};

    /**
    * @ngdoc method
    * @name getIndex
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Get the current index
    **/
	this.getIndex= function(){
		return this.index;
	};

    /**
    * @ngdoc method
    * @name getIndexFromUrl
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Get the current index based on the url value
    *
    * @param {String} url the url to parse
    *
    * @returns {int} the index retrieved from the url
    **/
	this.getIndexFromUrl= function(url){
		var regex=/\d+/;
		var matches= url.match(regex);
		if (matches){
			return parseInt(matches[0]) -1;
		}
		return 0;
	};

    /**
    * @ngdoc method
    * @name init
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Listen to route changes events and update index accordingly
    **/
	this.init= function(){
		var that= this;

		//initialize index
		that.index= this.getIndexFromUrl($location.path());

		//Update index when url changes
		$rootScope.$on('$routeChangeStart', function(event, next, current){
			if (next === current){
				return;
			}
			var newIndex= that.getIndexFromUrl($location.path());
			if (newIndex != that.index){
				newIndex= that.goToIndex(newIndex);
				if (that.indexCallback){
					that.indexCallback(newIndex);
				}
			}
		});
		
	};



}



]);

