'use strict';

angular.module('siApp').controller('scheduleCtrl', ['$scope', 'dataExchangeService', '$compile', '$element', '$timeout', '$http', 'Dashboard',
											function($scope, dataExchangeService, $compile, $element, $timeout, $http, Dashboard){
	$scope.stuff = {};
	$scope.dailyStuff = ['', [], [], [], [], [], [], []];
	$scope.name = dataExchangeService.name;
	$scope.gpid = dataExchangeService.id;
	$scope.type = dataExchangeService.type;
	$scope.displayedId = dataExchangeService.id;
	$scope.notifs = 0;

	$scope.lectures = Dashboard.getSchedule($scope.type, dataExchangeService.id);
	for(var i=0; i<$scope.lectures.length; i++) {
		var d = new Date($scope.lectures[i].startsAt);
		$scope.dailyStuff[d.getDay()].push($scope.lectures[i]);
		if($scope.lectures[i].notifications.length > 0) $scope.notifs++;
	}
	
	$scope.openModal = function(tp, elementid){
		var el = $compile( "<si-modal id='displayedModal' elementid='"+ elementid +"' type='"+ tp +"' gpid='"+ arguments[2] +"'></si-modal>" )( $scope );
		$element.parent().append( el );
		$timeout(function() {
		    angular.element("#displayedModal").addClass("displayedModal");
		}, 100);
	};
	$scope.closeModal = function(title){
		angular.element("#displayedModal").removeClass("displayedModal");
		$timeout(function() {
		    angular.element("#displayedModal").remove();
		}, 350);
	};
}]);