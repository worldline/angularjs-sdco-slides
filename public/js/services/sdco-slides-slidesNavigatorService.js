


function slidesNavigator(sdcoInfosSlidesService, sdcoAnimationManagerService, $location, $rootScope){

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

	this.getIndexFromUrl= function(url){

		for (var idx in sdcoInfosSlidesService){
			var current= sdcoInfosSlidesService[idx];
			if (current.url == url){
				return parseInt(idx);
			}
		}

		return 0;
	}

	//initialize index
	this.index= this.getIndexFromUrl($location.url());

}


angular.module('blogApp')
.service('sdcoSlidesNavigatorService', 
	['sdcoInfosSlidesService', 'sdcoAnimationManagerService','$location', '$rootScope', slidesNavigator]);