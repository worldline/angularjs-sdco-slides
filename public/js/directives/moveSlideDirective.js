/*angular.module('myapp.directives', [])
.directive('hello', function () {
    return {
        restrict: 'E',
        template: '<p>Hello from directive</p>'
    };
});*/

angular.module('blogApp')
.directive('moveSlide',[ '$log',
	function($log){
		return{
			restrict: 'A',
			scope:{
				left:'=left',
				right:'=right',
				currentIndex:'='
			},
			link:function(scope, element, attrs){

				element.on('click',function(){
					scope.$apply(function(){
						if (scope.right==true){
				    		// slideNavigatorService.increment();
				    		scope.currentIndex++;
						}else if (scope.left==true){
				    		// slideNavigatorService.decrement();
				    		scope.currentIndex--;
						}
					});
				});
			}
		}

	}

]);