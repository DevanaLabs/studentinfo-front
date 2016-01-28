'use strict';

angular.module('siApp')
.controller('baseCtrl', ['$scope', 'ScreensaverTimer', 'Dashboard', '$http', '$window', '$timeout', "$location", 
				function($scope, ScreensaverTimer, Dashboard, $http, $window, $timeout, $location){
	Dashboard.refreshData();
	$scope.baseClick = function() {
		ScreensaverTimer.resetTimer();
		//console.log('This should reset the timer');
	}
	function getRevision () {
		$http({
			method: 'GET',
			url: '/revision.txt'
		}).then(function successCallback(response) {
			console.log(response.data);
			if(currentRevision == "") {
				currentRevision = response.data;
			}
			else if (currentRevision != response.data) {
				localStorage.clear();
				$location.url("")
				$window.location.reload();
			}
		});
		$timeout(function(){getRevision()}, 5*60*1000);
	}
	var currentRevision = "";
	getRevision()
}]);