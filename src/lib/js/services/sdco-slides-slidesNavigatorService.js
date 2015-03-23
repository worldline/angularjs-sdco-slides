angular.module('sdco-slides.services')
.service('sdcoSlidesNavigatorService', ['sdcoInfosSlidesService', 'sdcoAnimationManagerService','$location', '$rootScope', 
function (sdcoInfosSlidesService, sdcoAnimationManagerService, $location, $rootScope){

	this.nbSlides= sdcoInfosSlidesService.templates.length;
	this.nextRoute= '/';
	this.indexCallback= undefined;


	this.increment= function(){
		return this.goToIndex(this.index+1);		
	};

	this.decrement= function(){
		return this.goToIndex(this.index-1);
	};

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

		this.nextRoute= 'slide' + (this.index+1);
		$location.url(this.nextRoute);
		return idx;	
	};

	this.getIndex= function(){
		return this.index;
	};

	this.getIndexFromUrl= function(url){
		var regex=/\d+/;
		var matches= url.match(regex);
		if (matches){
			return parseInt(matches[0]) -1;
		}
		return 0;
	};

	this.init= function(){
		var that= this;

		//initialize index
		that.index= this.getIndexFromUrl($location.path());

		//Update index when url changes
		$rootScope.$on('$routeChangeStart', function(event, next, current){
			if (next === current){
				return;
			}
			var newIndex= that.getIndexFromUrl($location.path());
			if (newIndex != that.index){
				newIndex= that.goToIndex(newIndex);
				if (that.indexCallback){
					that.indexCallback(newIndex);
				}
			}
		});
		
	};



}



]);

