angular.module('sdco-slides.directives')
 /**
 * @ngdoc directive
 * @name sdco-slides.directive:sdcoSlidescontainer
 * @restrict E
 *
 * @description
 * The directive which owns the whole application.
 * Add this directive in your DOM to display the slides you have defined.
 *
 * @param {String} heading the title of the tab
 *
 * @example
 * <pre>
 * <sdco-editor compile="false" compile-on-demand="true" js-fiddle="true">
 *  <sdo-editor-tab type="html" heading="index.html">
 *   &lt;p&gt; id="elt" my escaped html content &lt/p&gt;
 *  </sdco-editor-tab>
 *  <sdo-editor-tab type="javascript" heading="main.js">
 *   document.getElementById('elt').innerText='changed';
 *  </sdco-editor-tab> 
 *  <sdo-editor-tab type="css" heading="main.css">
 *   p{
 *	  color: red;
 *   }
 *  </sdco-editor-tab>
 * </sdco-editor>
 * </pre>
 **/
.directive('sdcoSlidescontainer', ['$window', '$timeout', 
   '$log', '$rootScope', 'sdcoInfosSlidesService', 'sdcoSlidesNavigatorService', 'sdcoEditorService',
   function($window, $timeout, $log, $rootScope, sdcoInfosSlidesService, 
   			sdcoSlidesNavigatorService,  sdcoEditorService){

	   	return {
			restrict:'E',
			replace: true,
			template:''+
				'<div sdco-slides-keydown current-index="currentIndex">' +
				'	<nav>' +
				'		<h1> <a>navigation features</a> </h1>' +
				'		<div class="row" style="margin-left:5px; margin-right: 0;">' +
				'			<sdco-updatable-progress-bar' +
				'				the-array="slides"' +
				'				current-index="currentIndex"' +
				'				progress-bar-display="{{progressBarDisplay}}" ' +
				'			></sdco-updatable-progress-bar>' +
				'			<sdco-notes-export></sdco-notes-export>' +
				'		</div>' +
				'		<button sdco-move-slide ' +
				'			left="true" class="left-link" ' +
				'			current-index="currentIndex" ' +
				'		/>' +
				'		<button sdco-move-slide ' +
				'			right="true" class="right-link" ' +
				'			current-index="currentIndex"' +
				'		/>' +
				'	</nav>' +
				'	<div ' +
				'		ng-view ' +
				'		sdco-view-size ' +
				'		ng-class="slideClasses" ' +
				'		ng-style="slideStyles" ' +
				'		class="view-content"' +
				'	>' +
				'	</div>' +	
				'</div>' +
		'',
			link: function($scope, $element, $attrs){

				$rootScope.currentIndex= sdcoSlidesNavigatorService.getIndex();
			    sdcoSlidesNavigatorService.indexCallback= function(index){
			      $rootScope.currentIndex= index;
			    };

			    //Watch currentIndex to go to the specified slide
			    $rootScope.$watch('currentIndex', function(newValue, oldValue){
			        if (newValue !== undefined){
			            $rootScope.currentIndex= sdcoSlidesNavigatorService.goToIndex(newValue);
			        }
			    });				

				$scope.progressBarDisplay= $attrs.progressBarDisplay;

			    $scope.slides= sdcoInfosSlidesService.templates;

			    $scope.action= function(){ 
			      sdcoEditorService.toDom();
			      sdcoEditorService.reset();
			    };		    

			}
		};
}]);