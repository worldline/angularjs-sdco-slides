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