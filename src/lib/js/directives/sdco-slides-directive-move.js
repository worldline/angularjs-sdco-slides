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