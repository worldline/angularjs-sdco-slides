angular.module('blogApp')
.controller('mainController', 
  ['$scope', '$rootScope','$window', '$timeout', 'infosSlidesService', 'slidesNavigatorService',
  function($scope, $rootScope, $window, $timeout, infosSlidesService, slidesNavigatorService){

    $scope.slides= infosSlidesService;
    $scope.currentIndex= slidesNavigatorService.getIndex();
    //console.log('currentIndex= ' + $scope.currentIndex);

    //Update current index appropriately when current index change,
    //so updatableBar will be updated
/*    $rootScope.$on("$locationChangeStart",
      function(event, next, previous){
                $scope.currentIndex= slidesNavigatorService.getIndex();
    });*/

    //Watch currentIndex to go to the specified slide
    $scope.$watch('currentIndex', function(newValue, oldValue){
        if (newValue){
            $scope.currentIndex= slidesNavigatorService.goToIndex(newValue);
        }
    });

    var getSizes= function(){
      var windowSize= $window.innerWidth;
      var bodyMargin= 8;
      var progressBarWidth= windowSize - 2*bodyMargin - 20;
    }

    getSizes();

  }
]);