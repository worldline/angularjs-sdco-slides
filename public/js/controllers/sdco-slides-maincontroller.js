angular.module('blogApp')
.controller('sdcoSlidesMaincontroller', 
  ['$scope', '$rootScope','$window', '$timeout', '$log', 'sdcoInfosSlidesService', 'sdcoSlidesNavigatorService',
  function($scope, $rootScope, $window, $timeout, $log, sdcoInfosSlidesService, sdcoSlidesNavigatorService){

    $scope.slides= sdcoInfosSlidesService;
    $scope.currentIndex= sdcoSlidesNavigatorService.getIndex();

    //Watch currentIndex to go to the specified slide
    $scope.$watch('currentIndex', function(newValue, oldValue){
        if (newValue != undefined){
            $scope.currentIndex= sdcoSlidesNavigatorService.goToIndex(newValue);
        }
    });

    $scope.keypress= function(event){
      if (event.which === 37){
        $scope.currentIndex= sdcoSlidesNavigatorService.decrement();
      }
      else if (event.which === 39){
        $scope.currentIndex= sdcoSlidesNavigatorService.increment();
      }
    }

  }
]);