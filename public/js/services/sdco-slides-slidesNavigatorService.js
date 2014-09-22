


function slidesNavigator(sdcoInfosSlidesService, sdcoAnimationManagerService, $location, $rootScope){

	this.index= 0;
	this.nbSlides= sdcoInfosSlidesService.length;
	this.nextRoute= '/';


	this.increment= function(){
		return this.goToIndex(this.index+1);		
	}

	this.decrement= function(){
		return this.goToIndex(this.index-1);
	}

	this.goToIndex= function(idx){
		if (idx<0){
			return 0;
		} 
		if(idx+1>this.nbSlides){
			return this.nbSlides-1;
		}

		var increment= idx>this.index;
		var decrement= idx<this.index;
		var stayOnPage= (idx == this.index);

		if (stayOnPage){
			return idx;
		}

		this.index=idx;
		if (increment){
			sdcoAnimationManagerService.applyRight();
		}else if (decrement){
			sdcoAnimationManagerService.applyLeft();
		}

		this.nextRoute= sdcoInfosSlidesService[this.index].url;
		$location.url(this.nextRoute);
		return idx;	
	}

	this.getIndex= function(){
		return this.index;
	}

}


angular.module('blogApp')
.service('sdcoSlidesNavigatorService', 
	['sdcoInfosSlidesService', 'sdcoAnimationManagerService','$location', '$rootScope', slidesNavigator]);