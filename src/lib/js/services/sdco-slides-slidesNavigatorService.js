angular.module('sdco-slides.services')
/**
 * @ngdoc service
 * @name sdco-slides.service:sdcoSlidesNavigatorService
 *
 * @description
 * Make the glue between the index and the view: update the route based on the index
 * and reciprocally
 **/
.service('sdcoSlidesNavigatorService', ['sdcoInfosSlidesService', 'sdcoAnimationManagerService','$location', '$rootScope', 
function (sdcoInfosSlidesService, sdcoAnimationManagerService, $location, $rootScope){

	this.nbSlides= sdcoInfosSlidesService.templates.length;
	this.nextRoute= '/';
	this.indexCallback= undefined;
	this.displayNav= true;

    /**
    * @ngdoc method
    * @name increment
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Increment the index if possible and go to the associated view
    **/
	this.increment= function(){
		return this.goToIndex(this.index+1);		
	};

    /**
    * @ngdoc method
    * @name decrement
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Decrement the index if possible and go to the associated view
    **/
	this.decrement= function(){
		return this.goToIndex(this.index-1);
	};

    /**
    * @ngdoc method
    * @name goToIndex
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Update the index if possible and go to the associated view accordingly
    *
    * @param {int} idx the index to go to
    **/
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

    /**
    * @ngdoc method
    * @name getIndex
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Get the current index
    **/
	this.getIndex= function(){
		return this.index;
	};

    /**
    * @ngdoc method
    * @name getIndexFromUrl
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Get the current index based on the url value
    *
    * @param {String} url the url to parse
    *
    * @returns {int} the index retrieved from the url
    **/
	this.getIndexFromUrl= function(url){
		var regex=/\d+/;
		var matches= url.match(regex);
		if (matches){
			return parseInt(matches[0]) -1;
		}
		return 0;
	};

    /**
    * @ngdoc method
    * @name init
    * @methodOf sdco-slides.service:sdcoSlidesNavigatorService
    * @description
    * Listen to route changes events and update index accordingly
    **/
	this.init= function(){
		var that= this;

		//initialize index
		that.index= this.getIndexFromUrl($location.path());

		var urlsParams= $location.search();
		if (urlsParams.displayNav !== undefined){
			that.displayNav= (urlsParams.displayNav === 'true');
		}

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

