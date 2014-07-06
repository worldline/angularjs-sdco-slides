angular.module('blogApp')
.controller('mainController', 
  ['$scope', '$rootScope','$window', 'infosSlidesService', 'slidesNavigatorService',
  function($scope, $rootScope, $window, infosSlidesService, slidesNavigatorService){

    $scope.slides= infosSlidesService;
    $scope.currentIndex= slidesNavigatorService.getIndex();
    //console.log('currentIndex= ' + $scope.currentIndex);

    var getSizes= function(){
      var windowSize= $window.innerWidth;
      var bodyMargin= 8;
      var progressBarWidth= windowSize - 2*bodyMargin - 20;
    }

    getSizes();

    // $scope.getTooltip= function(index){
    //   var slide= $scope.slides[index];
    //   return (index +1) + ' (' + slide.url + ') ';
    // }

    // $scope.goToSlide= function(index){
    //   slidesNavigatorService.goToIndex(index);
    //   $scope.currentIndex= index;
    // }

    // $scope.getSuccessSlides= function(){
    //   var start= 0;
    //   var end= $scope.currentIndex+1;
    //   $scope.sucesSlides= $scope.slides.slice(start,end);
    //   return $scope.sucesSlides;
    // }

    // $scope.getDangerSlides= function(){
    //   var start= $scope.currentIndex+1;
    //   var end= $scope.length;
    //   $scope.dangerSlides= $scope.slides.slice(start,end);
    //   return $scope.dangerSlides;
    // }

    // $scope.getSuccessElementsSize= function(){
    //   if ($scope.sucesSlides){
    //     return 100/$scope.sucesSlides.length + '%';
    //   }
    //   return 0;
    // }

    // $scope.getDangerElementsSize= function(){
    //   if ($scope.sucesSlides){
    //     return 100/$scope.dangerSlides.length + '%';
    //   }
    //   return 0;
    // }

    // $rootScope.$on("$locationChangeStart",
    //   function(event, next, previous){
    //     $scope.currentIndex= slidesNavigatorService.getIndex();
    // });


  }
]);