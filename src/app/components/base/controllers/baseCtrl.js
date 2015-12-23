'use strict';

angular.module('siApp')
.controller('baseCtrl', ['$scope', 'ScreensaverTimer', function($scope, ScreensaverTimer){
	$scope.baseClick = function() {
		ScreensaverTimer.resetTimer();
		//console.log('This should reset the timer');
	}
}]);