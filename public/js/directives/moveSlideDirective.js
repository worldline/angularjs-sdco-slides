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