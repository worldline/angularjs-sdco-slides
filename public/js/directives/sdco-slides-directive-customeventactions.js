angular.module('blogApp')
.directive('sdcoCustomEventActions',[ '$log',
	function($log){
		return{
			restrict: 'A',
			scope:{
				currentIndex:'='
			},
			link:function(scope, element, attrs){

				//Make the element selectable
				//element.attr('tabindex', '1');

				element.on('keydown',function(e){
					$log.info('Current Index: ' + scope.currentIndex);
					scope.$apply(function(){
						if (e.keyCode == 37){//left
							// $log.info('going left');
							scope.currentIndex--;
						}
						else if (e.keyCode == 39){//right
							// $log.info('going right');
							scope.currentIndex++;
						}
					});
				});
			}
		}

	}

]);