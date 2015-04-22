angular.module('sdco-slides.services')
/**
 * @ngdoc service
 * @name sdco-slides.service:sdcoAnimationManagerService
 *
 * @description
 * 
 * <p> 
 *  This service is used (mainly internally) to help managing animations
 *  by setting custom class and styles used in the view depending
 *  on user actions.
 * </p>
 **/
.service('sdcoAnimationManagerService', ['$rootScope', function ($rootScope){

    this.animationsClasses=['slide-animate'];
    this.currentAnimationIdx= 0;
    var that= this;

    this.animations={
      'slide-animate-right': true,
      'slide-animate-left': false
    };


    this.customStyles={};


    this.init= function(){
        $rootScope.slideClasses= this.animations;
        $rootScope.slideStyles= this.customStyles;
    };

    /**
    * @ngdoc method
    * @name updateCustomStyles
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Dynamically update the styles of the view
    * 
    * @param {Object} newStyles an object of  css properties
    **/
    this.updateCustomStyles= function(newStyles){
        angular.forEach(newStyles, function(val, key){
            that.customStyles[key] = val;
        });
    };

    /**
    * @ngdoc method
    * @name applyRight
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Apply needed classes for a right slide move (automatically called)
    **/
    this.applyRight= function(){
        this.apply('right');
    };

    /**
    * @ngdoc method
    * @name applyLeft
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Apply needed classes for a left slide move (automatically called)
    **/
    this.applyLeft= function(){
        this.apply('left');
    };

    /**
    * @ngdoc method
    * @name apply
    * @methodOf sdco-slides.service:sdcoAnimationManagerService
    * @description
    * Apply a suffix on animation classes
    *
    * @param {String} suffix the suffix to apply
    **/
    this.apply= function(suffix){
        // var that= this;
        var classToSet= that.animationsClasses[that.currentAnimationIdx] + '-' + suffix;
        jQuery.each(that.animations, function(key, value){
            that.animations[key]= false;
        });
        that.animations[classToSet]= true;
    };


    this.getAnimations= function(){
        return this.animations;
    };

    this.setAnimation= function(idx){
        this.currentAnimationIdx= idx;
    };

}]);