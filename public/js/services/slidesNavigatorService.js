


function slidesNavigator(infosSlidesService, animationManagerService, $location, $rootScope){

	this.index= 0;
	this.nbSlides= infosSlidesService.length;
	this.nextRoute= '/';

	this.init= function(){
		var that= this;
		$rootScope.$on("$locationChangeStart",
			function(event, next, previous){
				if (next == that.nextRoute){
					//Event throwed by this service, avoid recursive calls
					return;
				}else{
					//url is set manually, Update current index
					var found= false;
					jQuery.each(infosSlidesService, function(idx, value){
						if (next.match(value.url +'$')){
							found= true;
							that.index= idx;
							return;
						}
					});

					if (!found){
						//Should not happen
						that.index= 0;
					}
				}
			}
		);
	}


	this.increment= function(){
		this.goToIndex(this.index+1);		
	}

	this.decrement= function(){
		this.goToIndex(this.index-1);
	}

	this.goToIndex= function(idx){
		if (idx<0 || idx+1>this.nbSlides){
			return;
		}
		var increment= idx>this.index;
		var decrement= idx<this.index;
		var stayOnPage= (idx == this.index);

		this.index=idx;
		if (increment){
			animationManagerService.applyRight();
		}else if (decrement){
			animationManagerService.applyLeft();
		}

		this.nextRoute= infosSlidesService[this.index].url;
		$location.url(this.nextRoute);		
	}

	this.getIndex= function(){
		return this.index;
	}

}


angular.module('blogApp')
.service('slidesNavigatorService', 
	['infosSlidesService', 'animationManagerService','$location', '$rootScope', slidesNavigator]);