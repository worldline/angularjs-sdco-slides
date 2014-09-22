
angular.module('blogApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
//Config routes
.config(['$routeProvider','sdcoInfosSlidesService',
  function($routeProvider, sdcoInfosSlidesService){

      $routeProvider.when('/',{redirectTo:'/slide1'});

      jQuery.each(sdcoInfosSlidesService, function(index, value){
        $routeProvider
        .when(value.url, {
          templateUrl: value.template
        });
      });

      $routeProvider.otherwise({redirectTo:'/'});

}])
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

//Init view classes
.run(['sdcoAnimationManagerService','sdcoSlidesNavigatorService',
  function(sdcoAnimationManagerService,sdcoSlidesNavigatorService){
      sdcoAnimationManagerService.init();
  }
]);




