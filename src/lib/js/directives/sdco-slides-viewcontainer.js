angular.module('slides')
.directive('sdcoSlidescontainer', ['$rootScope','$window', '$timeout', 
   '$log', 'sdcoInfosSlidesService', 'sdcoSlidesNavigatorService', 'sdcoEditorService',
   function($rootScope, $window, $timeout, $log, sdcoInfosSlidesService, 
   			sdcoSlidesNavigatorService,  sdcoEditorService){

	   	return {
		restrict:'E',
		replace: true,
		template:''+
			'<div sdco-slides-keydown current-index="currentIndex">' +
			'<nav>' +
			'	<h1> <a>navigation features</a> </h1>' +
			'	<div class="row" style="margin-left:5px; margin-right: 0;">' +
			'		<div' +
			'			class="col-sm-11" ' +
			'			style="width:{{progressBarWidth}}; padding-right: 0px; padding-left: 0px;"' +
			'		>' +
			'			<sdco-updatable-progress-bar' +
			'				the-array="slides"' +
			'				current-index="currentIndex"' +
			'			/>' +
			'		</div>' +
			'		<sdco-notes-export></sdco-notes-export>' +
			'	</div>' +
			'	<button sdco-move-slide ' +
			'		left="true" class="left-link" ' +
			'		current-index="currentIndex" ' +
			'	/>' +
			'	<button sdco-move-slide ' +
			'		right="true" class="right-link" ' +
			'		current-index="currentIndex"' +
			'	/>' +
			'</nav>' +
			'<div ' +
			'	ng-view ' +
			'	sdco-view-size ' +
			'	ng-class="slideClasses" ' +
			'	ng-style="slideStyles" ' +
			'	class="view-content"' +
			'>' +
			'</div>' +
			'</div>' +
		'',
		link: function($scope, $element, $attrs){

		    $scope.slides= sdcoInfosSlidesService.templates;
		    $scope.currentIndex= sdcoSlidesNavigatorService.getIndex();
		    sdcoSlidesNavigatorService.indexCallback= function(index){
		      $scope.currentIndex= index;
		    };


		    //Watch currentIndex to go to the specified slide
		    $scope.$watch('currentIndex', function(newValue, oldValue){
		        if (newValue != undefined){
		            $scope.currentIndex= sdcoSlidesNavigatorService.goToIndex(newValue);
		        }
		    });

		    $scope.action= function(){ 
		      sdcoEditorService.toDom();
		      sdcoEditorService.reset();
		    };		

		}
	};
}]);