angular.module('sdco-slides.directives')
.directive('sdcoViewSize', ['sdcoAnimationManagerService', function(animationService){

	return {
		restrict:'A',
		link:function($scope, $element, $attrs){
			animationService.updateCustomStyles({width:Math.floor($element.width()) + 'px'});
		}
	};
}]);