angular.module('blogApp')
.directive('sdcoNotes',[ '$log', '$modal', '$location',
	function($log, $modal, $location){

		var notesController= function($scope){

			$scope.notes=localStorage.getItem($location.url());

			$scope.saveNotes= function(){
				localStorage.setItem($location.url(), $scope.notes);
			}


		}

		return{
			restrict: 'E',
			transclude: true,
			scope:{},
			template:'\
				<a href="" ng-click="open()"> \
					<img src="imgs/icon-note.png" style="width:1em;" /> \
				</p> \
				<div ng-show="false" ng-transclude /> \
			',
			controller:['$scope', notesController],
			link:function(scope, element, attrs){

				var transcludeElt= angular.element(element[0].querySelector('div[ng-transclude]'));
				var modalContent= transcludeElt.html();
				//remove transcluded content
				transcludeElt.contents().remove();			

				var getModalTemplate= function(content){
					return '<div style="font-size: small;"> \
								<div class="modal-header"> Notes </div> \
								<div class="modal-body">' +
									'<p>' + modalContent + '</p>' +
								'<h2>Your notes</h2>' + 
								'<textarea ng-model="notes" rows="10" style="width:100%;" />' +
								'<input type="submit" ng-click="saveNotes()" value="save" />' +
								'</div> \
							</div>';
				}

				scope.open= function(){
					$modal.open({
						template:getModalTemplate('test'),
						controller: notesController
					});
				};
			}
		}

	}

]);