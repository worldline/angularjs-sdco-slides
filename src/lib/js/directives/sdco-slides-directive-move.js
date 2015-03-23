angular.module('slides')
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