angular.module('slides')
.service('sdcoSlidesNavigatorService', ['sdcoInfosSlidesService', 'sdcoAnimationManagerService','$location', '$rootScope', 
function (sdcoInfosSlidesService, sdcoAnimationManagerService, $location, $rootScope){

	this.nbSlides= sdcoInfosSlidesService.templates.length;
	this.nextRoute= '/';
	this.indexCallback= undefined;


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

		this.nextRoute= 'slide' + (this.index+1);
		$location.url(this.nextRoute);
		return idx;	
	}

	this.getIndex= function(){
		return this.index;
	}

	this.getIndexFromUrl= function(url){
		// angular.forEach(sdcoInfosSlidesService.templates, function(index, value){
		// 	if ()
		// });
		var regex=/slide\d/i;
		var matches= url.match(regex);
		if (matches){
			return parseInt(matches[0].substring(matches[0].length - 1)) -1;
		}
		return 0;
	}

	this.init= function(){
		var that= this;

		//initialize index
		that.index= this.getIndexFromUrl($location.url());

		//Update index when url changes
		$rootScope.$on('$locationChangeStart', function(event, next, current){
			if (next === current){
				return;
			}
			var newIndex= that.getIndexFromUrl(next);
			if (newIndex != that.index){
				newIndex= that.goToIndex(newIndex);
				that.indexCallback && that.indexCallback(newIndex);
			}
		});
		
	}



}



]);

