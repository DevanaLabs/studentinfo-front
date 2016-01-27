'use strict';

angular.module("siApp")
.controller("sidebarCtrl", ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {
	$scope.state = function (state) {return $state.is(state); }
	
	$scope.date = new Date();
	$scope.currentTime = moment().locale('sr-cyrl').format('HH:MM - D. MMMM, dddd');
	function tick() {
		$scope.currentTime = moment().locale('sr-cyrl').format('HH:mm - D. MMMM, dddd');
		$timeout(function(){tick()}, 1000);
	}
	tick();

	$scope.goToSchedule = function() {
		if(!($state.is('preSchedule.groups') || $state.is('preSchedule.classrooms') || $state.is('preSchedule.teachers'))) {
			$state.go('preSchedule.groups');
		}
	}
}])
;