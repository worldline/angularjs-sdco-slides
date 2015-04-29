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
				    	$rootScope.currentIndex++;
					});
				});
			}
		};
	}
]);