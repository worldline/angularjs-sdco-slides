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