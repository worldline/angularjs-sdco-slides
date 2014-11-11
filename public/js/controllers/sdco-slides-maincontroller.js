angular.module('blogApp')
.controller('sdcoSlidesMaincontroller', 
  ['$scope', '$rootScope','$window', '$timeout', 
   '$log', 'sdcoInfosSlidesService', 'sdcoSlidesNavigatorService',
   'codeMirrorService',
  function($scope, $rootScope, $window, $timeout, $log, 
            sdcoInfosSlidesService, sdcoSlidesNavigatorService,
            codeMirrorService){

    $scope.slides= sdcoInfosSlidesService;
    $scope.currentIndex= sdcoSlidesNavigatorService.getIndex();

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