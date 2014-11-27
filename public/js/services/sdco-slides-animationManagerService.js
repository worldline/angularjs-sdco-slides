
function animationManager($rootScope){

	this.animationsClasses=['slide-animate'];
	this.currentAnimationIdx= 0;

	this.animations={
      'slide-animate-right': true,
      'slide-animate-left': false
    };

    this.init= function(){
    	$rootScope.slideClasses= this.animations;
    }

    this.applyRight= function(){
    	this.apply('right');
    }

    this.applyLeft= function(){
    	this.apply('left');
    }

    this.apply= function(suffix){
    	var that= this;
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

}


angular.module('blogApp')
.service('sdcoAnimationManagerService', ['$rootScope', animationManager]);