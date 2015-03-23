angular.module('slides')
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
    }

    this.updateCustomStyles= function(newStyles){
        angular.forEach(newStyles, function(val, key){
            that.customStyles[key] = val;
        });
    }

    this.applyRight= function(){
        this.apply('right');
    }

    this.applyLeft= function(){
        this.apply('left');
    }

    this.apply= function(suffix){
        // var that= this;
        var classToSet= that.animationsClasses[that.currentAnimationIdx] + '-' + suffix;
        jQuery.each(that.animations, function(key, value){
            that.animations[key]= false;
        })
        that.animations[classToSet]= true;
    }

    this.getAnimations= function(){
        return this.animations;
    }

    this.setAnimation= function(idx){
        this.currentAnimationIdx= idx;
    }

}]);