angular.module('slidesSample', ['slides'])
//Config routes
.config(['slidesConfigProvider',
  function(slidesConfigProvider){
    slidesConfigProvider.applyConf();
}])
//Init view classes
.run(['slidesConfig',  function(slidesConfig){
  slidesConfig.init();
}]);
