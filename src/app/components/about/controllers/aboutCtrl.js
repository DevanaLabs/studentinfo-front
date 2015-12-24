'use strict';

angular.module('siApp').controller('aboutCtrl', ['$scope', 'API_BASE_URL', '$http', function($scope, API_BASE_URL, $http){
	$scope.showKeyboard = false;

	$scope.sendFeedback = function() {
		var data = {'text':angular.element("#write").val()};
		console.log(data);
		console.log(API_BASE_URL + 'feedback/');
		$http.post(API_BASE_URL + 'feedback/', data).then(
			function(response){
				console.log(response);
			}, 
			function(response){
				console.log(response);
			}
		);
		angular.element("#write").empty();
	}

}]);