angular.module('blogApp')
.controller('sdcoSlidesMaincontroller', 
  ['$scope', '$rootScope','$window', '$timeout', 
   '$log', 'sdcoInfosSlidesService', 'sdcoSlidesNavigatorService',
   'codeMirrorService',
  function($scope, $rootScope, $window, $timeout, $log, 
            sdcoInfosSlidesService, sdcoSlidesNavigatorService,
            codeMirrorService){

    $scope.slides= sdcoInfosSlidesService.templates;
    $scope.currentIndex= sdcoSlidesNavigatorService.getIndex();
    sdcoSlidesNavigatorService.indexCallback= function(index){
      $scope.currentIndex= index;
    }


    //Watch currentIndex to go to the specified slide
    $scope.$watch('currentIndex', function(newValue, oldValue){
        if (newValue != undefined){
            $scope.currentIndex= sdcoSlidesNavigatorService.goToIndex(newValue);
        }
    });

    $scope.action= function(){ 
      codeMirrorService.toDom();
      codeMirrorService.reset();
    }

  }
]);