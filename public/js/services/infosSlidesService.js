
angular.module('blogApp')
.constant(
	'infosSlidesService', 
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