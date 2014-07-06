/*angular.module('myapp.directives', [])
.directive('hello', function () {
    return {
        restrict: 'E',
        template: '<p>Hello from directive</p>'
    };
});*/

angular.module('blogApp')
.directive('moveSlide',[ 'slidesNavigatorService', 'animationManagerService', '$log',
	function(slideNavigatorService, animationManagerService, $log){
		return{
			restrict: 'A',
			scope:{
				left:'=left',
				right:'=right'
			},
			link:function(scope, element, attrs){

				element.on('click',function(){
					scope.$apply(function(){
						if (scope.right==true){
				    		slideNavigatorService.increment();					
						}else if (scope.left==true){
				    		slideNavigatorService.decrement();
						}
					});
				});
			}
		}

	}

]);