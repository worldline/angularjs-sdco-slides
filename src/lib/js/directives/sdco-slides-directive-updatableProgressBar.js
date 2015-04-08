angular.module('sdco-slides.directives')
.directive('sdcoUpdatableProgressBar', ['$rootScope',

	function($rootScope){
		return{
			restrict:'E',
			replace: true,
			scope:{
				theArray:'=',
				currentIndex:'=',
				progressBarDisplay:'@'
			},
			template:' ' +
			'<span> ' +
			'<div' +
			'	class="col-sm-11" ' +
			'	style="padding-right: 0px; padding-left: 0px;"' +
			'>' +
			'	<progress max="theArray.length"> '+
			'		<bar value="currentIndex+1" type="success"> ' +
		    '		     <div ' +
		    '			   class="progress-sub-parts"' +
		    '		       style="width:{{getSuccessElementsSize()}};" ' +
		    '		       ng-repeat="slide in getSuccessSlides()" ' +
		    '		       tooltip="{{getTooltip($index)}}" ' +
		    '		       tooltip-placement="bottom" ' +
		    '		       ng-click="goToSlide($index)" ' +
		    '		     > ' +
		    '		     {{getSuccessSlidePagingLabel()}} ' +
		    '		     </div> ' +
			'		</bar> ' +
        	'		<bar value="theArray.length-currentIndex-1" type="danger"> ' +
          	'			<div ' +
		    '			   class="progress-sub-parts"' +
            '				style="width:{{getDangerElementsSize()}}" ' +
            '				ng-repeat="slide in getDangerSlides()" ' +
            '				tooltip="{{getTooltip(currentIndex+1+$index)}}" ' +
            '				tooltip-placement="bottom" ' +
            '				ng-click="goToSlide(currentIndex+1+$index)" ' +
          	'			> ' +
          	'				{{getDangerSlidePagingLabel()}} ' +
          	'			</div> ' +
          	'		</bar> ' +
			'	</progress> ' +
			'</div> ' +
			'<span class="global-paging"> {{getGlobalPagingLabel()}} </span>' +
			'</span> ' ,
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


			    $scope.getSuccessSlidePagingLabel= function(index){
					return ($scope.progressBarDisplay=='all'?$scope.$index + 1:'');
			    };

			    $scope.getDangerSlidePagingLabel= function(index){
					return ($scope.progressBarDisplay=='all'?$scope.$index + 1 + $scope.currentIndex:'');
			    };

			    $scope.getGlobalPagingLabel= function(index){
			    	if ($scope.sucesSlides && $scope.progressBarDisplay == 'global'){
			    		return $scope.sucesSlides.length + '/' + $scope.theArray.length;
			    	}
			    };

			}

		};
	}


]);