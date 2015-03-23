angular.module('sdco-slides.services')
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