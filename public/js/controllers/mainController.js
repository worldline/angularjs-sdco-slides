angular.module('blogApp')
.controller('mainController', 
  ['$scope', '$rootScope','$window', '$timeout', '$log', 'infosSlidesService', 'slidesNavigatorService',
  function($scope, $rootScope, $window, $timeout, $log, infosSlidesService, slidesNavigatorService){

    $scope.slides= infosSlidesService;
    $scope.currentIndex= slidesNavigatorService.getIndex();

    //Watch currentIndex to go to the specified slide
    $scope.$watch('currentIndex', function(newValue, oldValue){
        if (newValue != undefined){
            $scope.currentIndex= slidesNavigatorService.goToIndex(newValue);
            $log.info('currentIndex: ' + $scope.currentIndex);
        }
    });

  }
]);