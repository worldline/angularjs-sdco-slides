angular.module('sdco-slides.services')
/**
 * @ngdoc service
 * @name sdco-slides.service:sdcoInfosSlidesService
 *
 * @description
 * The json slides object.
 **/
.constant(
	'sdcoInfosSlidesService', 
	(
		function(){

			var res= null;

			$.ajax({
				type: 'GET',
				url: 'data/slides.json',
				dataType: 'json',
				data: {},
				success: function(data){res= data;},
				async: false
			});

			return res;
		}
	)()
);