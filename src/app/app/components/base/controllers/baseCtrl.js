'use strict';

angular.module('siApp')
.controller('baseCtrl', ['$scope', 'ScreensaverTimer', 'Dashboard', function($scope, ScreensaverTimer, Dashboard){
	Dashboard.refreshData();
	$scope.baseClick = function() {
		ScreensaverTimer.resetTimer();
		//console.log('This should reset the timer');
	}
}]);