angular.module('sdco-slides', ['sdco-slides.directives', 'sdco-slides.services'])
.config(['$provide', function($provide){

	//Decorate the progress directive
	$provide.decorator('progressDirective', ['$delegate',function($delegate){
		var directive= $delegate[0];
		directive.$$isolateBindings.max = {
          attrName: 'max',
          mode: '=',
          optional: false
        };
		$delegate[0].scope= {max:'='};
		return $delegate;
	}]);
}]);