
angular.module('blogApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'sdco-tools'])
//Config routes
.config(['$routeProvider','$locationProvider', 'sdcoInfosSlidesService', 'sdcoEditorServiceProvider',
  function($routeProvider, $locationProvider, sdcoInfosSlidesService, sdcoEditorServiceProvider){

      var baseTemplate= 'views/' + sdcoInfosSlidesService['templatesBase'] + '/';
      var firstSlideUrl= '/slide1';

      jQuery.each(sdcoInfosSlidesService['templates'], function(index, value){
        var url= '/slide' + (index+1),
            template= baseTemplate + value + '.html';
        $routeProvider.when( url, {templateUrl: template });
      });

      $routeProvider.otherwise({redirectTo: firstSlideUrl});
      $locationProvider.html5Mode(false);

      sdcoEditorServiceProvider.isStorageActive= true;
}])
//Init view classes
.run(['sdcoAnimationManagerService','sdcoSlidesNavigatorService','sdcoNotesService',
  function(sdcoAnimationManagerService,sdcoSlidesNavigatorService, sdcoNotesService){
      sdcoAnimationManagerService.init();
      sdcoSlidesNavigatorService.init();
      sdcoNotesService.init();
  }
]);




/*
// Define animations
.animation('.slide-animate-left',['$window',function($window){

  var width= jQuery($window).width();
  return {
    enter:function(element, done){
      element.css('position', 'absolute');
      element.css('left', '-1300px');
      jQuery(element).animate({
        left: 0
      });

    },
    leave:function(element, done){
      element.css('left', 0);
      jQuery(element).animate({
        position: 'absolute',
        left: width + 'px'
      });

    },
  }
}])
.animation('.slide-animate-right',['$window', function($window){

  var width= jQuery($window).width();
  return {
    enter:function(element, done){
      element.css('position', 'absolute');
      element.css('left', '1300px');
      jQuery(element).animate({
        left: 0
      });
    },
    leave:function(element, done){
      element.css('left', 0);
      jQuery(element).animate({
        position: 'absoute',
        left: '-' + width + 'px'
      });
    },
  }
}])*/