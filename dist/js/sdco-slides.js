angular.module('sdco-slides', ['sdco-slides.directives', 'sdco-slides.services'])
.config(['$provide', function($provide){

	//Decorate the progress directive
	$provide.decorator('progressDirective', ['$delegate',function($delegate){
		var directive= $delegate[0];
		directive.$$isolateBindings['max'] = {
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
						if (scope.right==true){
				    		scope.currentIndex++;
						}else if (scope.left==true){
				    		scope.currentIndex--;
						}
					});
				});
			}
		}
	}
]);
angular.module('sdco-slides.directives')
.directive('sdcoUpdatableProgressBar', ['$rootScope',

	function($rootScope){
		return{
			restrict:'E',
			scope:{
				theArray:'=',
				currentIndex:'='
			},
			template:'\
			<progress max="theArray.length">\
				<bar value="currentIndex+1" type="success">\
		          <div\
		            style="float:left; width:{{getSuccessElementsSize()}};" \
		            ng-repeat="slide in getSuccessSlides()"\
		            tooltip="{{getTooltip($index)}}"\
		            tooltip-placement="bottom"\
		            ng-click="goToSlide($index)"\
		          > \
		          	{{$index+1}}\
		          </div>\
				</bar>\
        		<bar value="theArray.length-currentIndex-1" type="danger">\
          			<div\
            			style="float:left; width:{{getDangerElementsSize()}};" \
            			ng-repeat="slide in getDangerSlides()"\
            			tooltip="{{getTooltip(currentIndex+1+$index)}}"\
            			tooltip-placement="bottom"\
            			ng-click="goToSlide(currentIndex+1+$index)"\
          			>\
          				{{currentIndex+1+$index+1}}\
          			</div>\
          		</bar>\
			</progress>',
			link:function($scope, element, attrs){

			    $scope.getTooltip= function(index){
			    	return 'slide' + (index + 1) + '(' + $scope.theArray[index] + ')';
			    }

			    $scope.goToSlide= function(index){
			      $scope.currentIndex= index;
			    }

			    $scope.getSuccessSlides= function(){
			      var start= 0;
			      var end= $scope.currentIndex+1;
			      $scope.sucesSlides= $scope.theArray.slice(start,end);
			      return $scope.sucesSlides;
			    }

			    $scope.getDangerSlides= function(){
			      var start= $scope.currentIndex+1;
			      var end= $scope.length;
			      $scope.dangerSlides= $scope.theArray.slice(start,end);
			      return $scope.dangerSlides;
			    }

			    $scope.getSuccessElementsSize= function(){
			      if ($scope.sucesSlides){
			        return 100/$scope.sucesSlides.length + '%';
			      }
			      return 0;
			    }

			    $scope.getDangerElementsSize= function(){
			      if ($scope.sucesSlides){
			        return 100/$scope.dangerSlides.length + '%';
			      }
			      return 0;
			    }

			}

		}
	}


]);
angular.module('sdco-slides.directives')
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
.directive('sdcoSlidescontainer', ['$rootScope','$window', '$timeout', 
   '$log', 'sdcoInfosSlidesService', 'sdcoSlidesNavigatorService', 'sdcoEditorService',
   function($rootScope, $window, $timeout, $log, sdcoInfosSlidesService, 
   			sdcoSlidesNavigatorService,  sdcoEditorService){

	   	return {
		restrict:'E',
		replace: true,
		template:''+
			'<div sdco-slides-keydown current-index="currentIndex">' +
			'<nav>' +
			'	<h1> <a>navigation features</a> </h1>' +
			'	<div class="row" style="margin-left:5px; margin-right: 0;">' +
			'		<div' +
			'			class="col-sm-11" ' +
			'			style="width:{{progressBarWidth}}; padding-right: 0px; padding-left: 0px;"' +
			'		>' +
			'			<sdco-updatable-progress-bar' +
			'				the-array="slides"' +
			'				current-index="currentIndex"' +
			'			/>' +
			'		</div>' +
			'		<sdco-notes-export></sdco-notes-export>' +
			'	</div>' +
			'	<button sdco-move-slide ' +
			'		left="true" class="left-link" ' +
			'		current-index="currentIndex" ' +
			'	/>' +
			'	<button sdco-move-slide ' +
			'		right="true" class="right-link" ' +
			'		current-index="currentIndex"' +
			'	/>' +
			'</nav>' +
			'<div ' +
			'	ng-view ' +
			'	sdco-view-size ' +
			'	ng-class="slideClasses" ' +
			'	ng-style="slideStyles" ' +
			'	class="view-content"' +
			'>' +
			'</div>' +
			'</div>' +
		'',
		link: function($scope, $element, $attrs){

		    $scope.slides= sdcoInfosSlidesService.templates;
		    $scope.currentIndex= sdcoSlidesNavigatorService.getIndex();
		    sdcoSlidesNavigatorService.indexCallback= function(index){
		      $scope.currentIndex= index;
		    };


		    //Watch currentIndex to go to the specified slide
		    $scope.$watch('currentIndex', function(newValue, oldValue){
		        if (newValue != undefined){
		            $scope.currentIndex= sdcoSlidesNavigatorService.goToIndex(newValue);
		        }
		    });

		    $scope.action= function(){ 
		      sdcoEditorService.toDom();
		      sdcoEditorService.reset();
		    };		

		}
	};
}]);
angular.module('sdco-slides.directives')
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
    }

    this.updateCustomStyles= function(newStyles){
        angular.forEach(newStyles, function(val, key){
            that.customStyles[key] = val;
        });
    }

    this.applyRight= function(){
        this.apply('right');
    }

    this.applyLeft= function(){
        this.apply('left');
    }

    this.apply= function(suffix){
        // var that= this;
        var classToSet= that.animationsClasses[that.currentAnimationIdx] + '-' + suffix;
        jQuery.each(that.animations, function(key, value){
            that.animations[key]= false;
        })
        that.animations[classToSet]= true;
    }

    this.getAnimations= function(){
        return this.animations;
    }

    this.setAnimation= function(idx){
        this.currentAnimationIdx= idx;
    }

}]);
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

		angular.forEach(sdcoInfosSlidesService['templates'], function(value, index){
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
			}

		};

		return new SlidesConfig();
	}];

}]);
angular.module('sdco-slides.services')
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
.service('sdcoSlidesNavigatorService', ['sdcoInfosSlidesService', 'sdcoAnimationManagerService','$location', '$rootScope', 
function (sdcoInfosSlidesService, sdcoAnimationManagerService, $location, $rootScope){

	this.nbSlides= sdcoInfosSlidesService.templates.length;
	this.nextRoute= '/';
	this.indexCallback= undefined;


	this.increment= function(){
		return this.goToIndex(this.index+1);		
	}

	this.decrement= function(){
		return this.goToIndex(this.index-1);
	}

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
	}

	this.getIndex= function(){
		return this.index;
	}

	this.getIndexFromUrl= function(url){
		// angular.forEach(sdcoInfosSlidesService.templates, function(index, value){
		// 	if ()
		// });
		var regex=/slide\d/i;
		var matches= url.match(regex);
		if (matches){
			return parseInt(matches[0].substring(matches[0].length - 1)) -1;
		}
		return 0;
	}

	this.init= function(){
		var that= this;

		//initialize index
		that.index= this.getIndexFromUrl($location.url());

		//Update index when url changes
		$rootScope.$on('$locationChangeStart', function(event, next, current){
			if (next === current){
				return;
			}
			var newIndex= that.getIndexFromUrl(next);
			if (newIndex != that.index){
				newIndex= that.goToIndex(newIndex);
				that.indexCallback && that.indexCallback(newIndex);
			}
		});
		
	}



}



]);

