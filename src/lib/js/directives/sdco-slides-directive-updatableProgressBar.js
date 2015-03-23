angular.module('slides')
.directive('sdcoUpdatableProgressBar', ['$rootScope',

	function($rootScope){
		return{
			restrict:'E',
			priority: 100,
			scope:{
				theArray:'=',
				currentIndex:'='
			},
			template:'' +
			'<div>' +
			'	<div ' +
			'		ng-style="getSuccessStyle()"' +
			'		ng-repeat="slide in getSuccessSlides()"' +
			'		ng-click="goToSlide($index)"' +
			'	>' +
			'	{{$index + 1}}' +
			'	</div>' +
			'	<div ' +
			'		ng-style="getDangerStyle()"' +
			'		ng-repeat="slide in getDangerSlides()"' +
			'		ng-click="goToSlide($index + successSlides.length)"' +
			'	>' +
			'	{{$index + 1 + successSlides.length}}' +
			'	</div>' +
			'' +
			'</div>' +
			'',
			link:function($scope, element, attrs){

			    $scope.getTooltip= function(index){
			    	return 'slide' + (index + 1) + '(' + $scope.theArray[index] + ')';
			    }

			    $scope.goToSlide= function(index){
			      $scope.currentIndex= index;
			    }

			    $scope.getSuccessSlides= function(){
			      var start= 0;
			      var end= $scope.currentIndex+1;
			      $scope.successSlides= $scope.theArray.slice(start,end);
			      return $scope.successSlides;
			    }

			    $scope.getDangerSlides= function(){
			      var start= $scope.currentIndex+1;
			      var end= $scope.length;
			      $scope.dangerSlides= $scope.theArray.slice(start,end);
			      return $scope.dangerSlides;
			    }


			    $scope.getSuccessStyle= function(){
			        return {
			        	'width':$scope.theArray? 100/$scope.theArray.length + '%': '0',
			        	'float':'left',
			        	'height':'20px',
			        	'background-color': 'green',
			        	'text-align': 'center'
			        };
			    };

			    $scope.getDangerStyle= function(){
			        return {
			        	'width':$scope.theArray? 100/$scope.theArray.length + '%': '0',
			        	'float':'left',
			        	'height':'20px',
			        	'background-color': 'red',
			        	'text-align': 'center'
			        };
			    };
			}
		}
	}


]);