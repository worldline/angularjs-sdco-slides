


function slidesNavigator(infosSlidesService, animationManagerService, $location, $rootScope){

	this.index= 0;
	this.nbSlides= infosSlidesService.length;
	this.nextRoute= '/';


	this.increment= function(){
		this.goToIndex(this.index+1);		
	}

	this.decrement= function(){
		this.goToIndex(this.index-1);
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
			animationManagerService.applyRight();
		}else if (decrement){
			animationManagerService.applyLeft();
		}

		this.nextRoute= infosSlidesService[this.index].url;
		$location.url(this.nextRoute);
		return idx;	
	}

	this.getIndex= function(){
		return this.index;
	}

}


angular.module('blogApp')
.service('slidesNavigatorService', 
	['infosSlidesService', 'animationManagerService','$location', '$rootScope', slidesNavigator]);