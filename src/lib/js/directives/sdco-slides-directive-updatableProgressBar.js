angular.module('sdco-slides.directives')
.directive('sdcoUpdatableProgressBar', ['$rootScope',

	function($rootScope){
		return{
			restrict:'E',
			scope:{
				theArray:'=',
				currentIndex:'=',
				displayPage:'='
			},
			template:'' +
			'<progress max="theArray.length">'+
				'<bar value="currentIndex+1" type="success">'+
		          '<div '+
		            'style="float:left; width:{{getSuccessElementsSize()}};height:100%;"'+
		            'ng-repeat="slide in getSuccessSlides()"'+
		            'tooltip="{{getTooltip($index)}}"'+
		            'tooltip-placement="bottom"'+
		            'ng-click="goToSlide($index)"'+
		          '> '+
		          '	{{displayPage==\'all\'?$index+1:\'\'}}'+
		          '{{getPaging($index)}} '+
		          '</div>'+
				'</bar>'+
        		'<bar value="theArray.length-currentIndex-1" type="danger">'+
          		'	<div ' +
            	'		style="float:left; width:{{getDangerElementsSize()}};height:100%;" '+
            	'		ng-repeat="slide in getDangerSlides()" '+
            	'		tooltip="{{getTooltip(currentIndex+1+$index)}}" '+
            	'		tooltip-placement="bottom" ' +
            	'		ng-click="goToSlide(currentIndex+1+$index)" ' +
          		'	>' +
          		'		{{displayPage==\'all\'?currentIndex+1+$index+1:\'\'}}' +
          		'	</div> ' +
          		'</bar> ' +
			'</progress>',
			link:function($scope, element, attrs){

			    $scope.getTooltip= function(index){
			    	return 'slide' + (index + 1) + '(' + $scope.theArray[index] + ')';
			    };

			    $scope.goToSlide= function(index){
			      $scope.currentIndex= index;
			    };

			    $scope.getSuccessSlides= function(){
			      var start= 0;
			      var end= $scope.currentIndex+1;
			      $scope.sucesSlides= $scope.theArray.slice(start,end);
			      return $scope.sucesSlides;
			    };

			    $scope.getDangerSlides= function(){
			      var start= $scope.currentIndex+1;
			      var end= $scope.length;
			      $scope.dangerSlides= $scope.theArray.slice(start,end);
			      return $scope.dangerSlides;
			    };

			    $scope.getSuccessElementsSize= function(){
			      if ($scope.sucesSlides){
			        return 100/$scope.sucesSlides.length + '%';
			      }
			      return 0;
			    };

			    $scope.getDangerElementsSize= function(){
			      if ($scope.sucesSlides){
			        return 100/$scope.dangerSlides.length + '%';
			      }
			      return 0;
			    };

			    $scope.getPaging= function(index){
			    	if ($scope.sucesSlides && $scope.displayPage == 'global' && index+1 == $scope.sucesSlides.length){
			    		return $scope.sucesSlides.length + '/' + $scope.theArray.length;
			    	}
			    }

			}

		};
	}


]);