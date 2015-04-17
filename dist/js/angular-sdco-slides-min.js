/* Author: Legrand Régis<regis.legrand@worldline.com> */
/* Version: 1.0.0 */


angular.module("sdco-slides",["sdco-slides.directives","sdco-slides.services"]).config(["$provide",function(e){e.decorator("progressDirective",["$delegate",function(e){var t=e[0];return t.$$isolateBindings.max={attrName:"max",mode:"=",optional:!1},e[0].scope={max:"="},e}])}]),angular.module("sdco-slides.directives",[]),angular.module("sdco-slides.directives").directive("sdcoMoveSlide",["$log",function(){return{restrict:"A",scope:{left:"=left",right:"=right",currentIndex:"=",action:"&"},link:function(e,t){t.on("click",function(t){t.preventDefault(),e.$apply(function(){e.action(),e.right===!0?e.currentIndex++:e.left===!0&&e.currentIndex--})})}}}]),angular.module("sdco-slides.directives").directive("sdcoUpdatableProgressBar",["$rootScope",function(){return{restrict:"E",replace:!0,scope:{theArray:"=",currentIndex:"=",progressBarDisplay:"@"},template:' <span> <div	class="col-sm-11" 	style="padding-right: 0px; padding-left: 0px;">	<progress max="theArray.length"> 		<bar value="currentIndex+1" type="success"> 		     <div 			   class="progress-sub-parts"		       style="width:{{getSuccessElementsSize()}};" 		       ng-repeat="slide in getSuccessSlides()" 		       tooltip="{{getTooltip($index)}}" 		       tooltip-placement="bottom" 		       ng-click="goToSlide($index)" 		     > 		     {{getSuccessSlidePagingLabel()}} 		     </div> 		</bar> 		<bar value="theArray.length-currentIndex-1" type="danger"> 			<div 			   class="progress-sub-parts"				style="width:{{getDangerElementsSize()}}" 				ng-repeat="slide in getDangerSlides()" 				tooltip="{{getTooltip(currentIndex+1+$index)}}" 				tooltip-placement="bottom" 				ng-click="goToSlide(currentIndex+1+$index)" 			> 				{{getDangerSlidePagingLabel()}} 			</div> 		</bar> 	</progress> </div> <span class="global-paging"> {{getGlobalPagingLabel()}} </span></span> ',link:function(e){e.getTooltip=function(t){return"slide"+(t+1)+"("+e.theArray[t]+")"},e.goToSlide=function(t){e.currentIndex=t},e.getSuccessSlides=function(){var t=0,i=e.currentIndex+1;return e.sucesSlides=e.theArray.slice(t,i),e.sucesSlides},e.getDangerSlides=function(){var t=e.currentIndex+1,i=e.length;return e.dangerSlides=e.theArray.slice(t,i),e.dangerSlides},e.getSuccessElementsSize=function(){return e.sucesSlides?100/e.sucesSlides.length+"%":0},e.getDangerElementsSize=function(){return e.sucesSlides?100/e.dangerSlides.length+"%":0},e.getSuccessSlidePagingLabel=function(){return"all"==e.progressBarDisplay?e.$index+1:""},e.getDangerSlidePagingLabel=function(){return"all"==e.progressBarDisplay?e.$index+1+e.currentIndex:""},e.getGlobalPagingLabel=function(){return e.sucesSlides&&"global"==e.progressBarDisplay?e.sucesSlides.length+"/"+e.theArray.length:void 0}}}}]),angular.module("sdco-slides.directives").directive("sdcoSlidesKeydown",["$log",function(){return{restrict:"A",scope:{currentIndex:"="},link:function(e){angular.element("body").on("keydown",function(t){e.$apply(function(){37==t.keyCode?e.currentIndex--:39==t.keyCode&&e.currentIndex++})})}}}]),angular.module("sdco-slides.directives").directive("sdcoSlidescontainer",["$rootScope","$window","$timeout","$log","sdcoInfosSlidesService","sdcoSlidesNavigatorService","sdcoEditorService",function(e,t,i,n,s,r,o){return{restrict:"E",replace:!0,template:'<div sdco-slides-keydown current-index="currentIndex">	<nav>		<h1> <a>navigation features</a> </h1>		<div class="row" style="margin-left:5px; margin-right: 0;">			<sdco-updatable-progress-bar				the-array="slides"				current-index="currentIndex"				progress-bar-display="{{progressBarDisplay}}" 			></sdco-updatable-progress-bar>			<sdco-notes-export></sdco-notes-export>		</div>		<button sdco-move-slide 			left="true" class="left-link" 			current-index="currentIndex" 		/>		<button sdco-move-slide 			right="true" class="right-link" 			current-index="currentIndex"		/>	</nav>	<div 		ng-view 		sdco-view-size 		ng-class="slideClasses" 		ng-style="slideStyles" 		class="view-content"	>	</div></div>',link:function(e,t,i){e.progressBarDisplay=i.progressBarDisplay,e.slides=s.templates,e.currentIndex=r.getIndex(),r.indexCallback=function(t){e.currentIndex=t},e.$watch("currentIndex",function(t){void 0!==t&&(e.currentIndex=r.goToIndex(t))}),e.action=function(){o.toDom(),o.reset()}}}}]),angular.module("sdco-slides.directives").directive("sdcoViewSize",["sdcoAnimationManagerService",function(e){return{restrict:"A",link:function(t,i){e.updateCustomStyles({width:Math.floor(i.width())+"px"})}}}]),angular.module("sdco-slides.services",["ngRoute","ngAnimate","ngSanitize","ui.bootstrap","sdco-tools"]),angular.module("sdco-slides.services").service("sdcoAnimationManagerService",["$rootScope",function(e){this.animationsClasses=["slide-animate"],this.currentAnimationIdx=0;var t=this;this.animations={"slide-animate-right":!0,"slide-animate-left":!1},this.customStyles={},this.init=function(){e.slideClasses=this.animations,e.slideStyles=this.customStyles},this.updateCustomStyles=function(e){angular.forEach(e,function(e,i){t.customStyles[i]=e})},this.applyRight=function(){this.apply("right")},this.applyLeft=function(){this.apply("left")},this.apply=function(e){var i=t.animationsClasses[t.currentAnimationIdx]+"-"+e;jQuery.each(t.animations,function(e){t.animations[e]=!1}),t.animations[i]=!0},this.getAnimations=function(){return this.animations},this.setAnimation=function(e){this.currentAnimationIdx=e}}]),angular.module("sdco-slides.services").provider("slidesConfig",["$routeProvider","$locationProvider","sdcoInfosSlidesService","sdcoEditorServiceProvider",function(e,t,i,n){var s={templatesRootPath:"views/partials/"};this.setTemplatesRootPath=function(e){s.templatesRootPath=e},this.applyConf=function(){var r;angular.forEach(i.templates,function(t,i){var n="/slide"+(i+1),o=s.templatesRootPath+t+".html";0===i&&(r=n),e.when(n,{templateUrl:o})}),e.otherwise({redirectTo:r}),t.html5Mode(!1),n.isStorageActive=!0},this.$get=["sdcoAnimationManagerService","sdcoSlidesNavigatorService","sdcoNotesService",function(e,t,i){var n=function(){this.getConfig=function(){return s},this.init=function(){e.init(),t.init(),i.init()}};return new n}]}]),angular.module("sdco-slides.services").constant("sdcoInfosSlidesService",function(){var e=null;return $.ajax({type:"GET",url:"data/slides.json",dataType:"json",data:{},success:function(t){e=t},async:!1}),e}()),angular.module("sdco-slides.services").service("sdcoSlidesNavigatorService",["sdcoInfosSlidesService","sdcoAnimationManagerService","$location","$rootScope",function(e,t,i,n){this.nbSlides=e.templates.length,this.nextRoute="/",this.indexCallback=void 0,this.increment=function(){return this.goToIndex(this.index+1)},this.decrement=function(){return this.goToIndex(this.index-1)},this.goToIndex=function(e){if(0>e)return 0;if(e+1>this.nbSlides)return this.nbSlides-1;var n=e>this.index,s=e<this.index,r=e==this.index;return r?e:(this.index=e,n?t.applyRight():s&&t.applyLeft(),this.nextRoute="slide"+(this.index+1),i.url(this.nextRoute),e)},this.getIndex=function(){return this.index},this.getIndexFromUrl=function(e){var t=/\d+/,i=e.match(t);return i?parseInt(i[0])-1:0},this.init=function(){var e=this;e.index=this.getIndexFromUrl(i.path()),n.$on("$routeChangeStart",function(t,n,s){if(n!==s){var r=e.getIndexFromUrl(i.path());r!=e.index&&(r=e.goToIndex(r),e.indexCallback&&e.indexCallback(r))}})}}]);