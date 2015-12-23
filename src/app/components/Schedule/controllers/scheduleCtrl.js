'use strict';

angular.module('siApp').controller('scheduleCtrl', ['$scope', 'dataExchangeService', 'dataService', '$compile', '$element', '$timeout', '$http', 'Dashboard',
											function($scope, dataExchangeService, dataService, $compile, $element, $timeout, $http, Dashboard){
	//this.stuff = {"id":1,"name":"302","year":3,"lectures":[{"id":1,"type":"Predavanje","course":{"id":1,"code":"M1","name":"Predmet 1","semester":3,"espb":5,"lectures":[],"students":[],"events":[]},"professor":{"id":1,"firstName":"Nebojsa","lastName":"Urosevic","title":"drmr","lectures":[]},"classroom":{"id":1,"name":"e12","directions":"levo","floor":7,"lectures":[],"events":[]},"students":[],"groups":[],"notifications":[{"id":1,"description":"blejaNaLecture","expiresAt":"2016-01-29T15:00:00+0000"}],"startsAt":"2016-01-29T15:00:00+0000","endsAt":"2016-01-29T18:00:00+0000"}],"events":[{"id":1,"type":"KLK2","description":"nenadoknadiv klk2","startsAt":"2016-02-29T15:00:00+0000","endsAt":"2016-02-29T18:00:00+0000","notifications":[{"id":2,"description":"blejaNaEventu","expiresAt":"2016-01-29T15:00:00+0000"}],"classrooms":[]}]};
	$scope.stuff = {};//{"id":1,"name":"302","year":3,"lectures":[{"id":1,"type":"Predavanje","course":{"id":1,"code":"M1","name":"Predmet 1","semester":3,"espb":5,"lectures":[],"students":[],"events":[]},"professor":{"id":1,"firstName":"Nebojsa","lastName":"Urosevic","title":"drmr","lectures":[]},"classroom":{"id":1,"name":"e12","directions":"levo","floor":7,"lectures":[],"events":[]},"students":[],"groups":[],"notifications":[{"id":1,"description":"blejaNaLecture","expiresAt":"2016-01-29T15:00:00+0000"}],"startsAt":"2016-01-29T15:00:00+0000","endsAt":"2016-01-29T18:00:00+0000"}],"events":[{"id":1,"type":"KLK2","description":"nenadoknadiv klk2","startsAt":"2016-02-29T15:00:00+0000","endsAt":"2016-02-29T18:00:00+0000","notifications":[{"id":2,"description":"blejaNaEventu","expiresAt":"2016-01-29T15:00:00+0000"}],"classrooms":[]}]};
	//console.log(dataExchangeService);
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
	
	//console.log("Stuff", $scope.stuff);
	//dataExchangeService.type = 'classroom';
	//console.log(dataExchangeService);
	$scope.openModal = function(tp, elementid){
		//console.log("args", arguments);
		//console.log("openModal()  type: ", tp, "ID: ", elementid);
		//var a = elementid.split(' ');
		//var b = ""
		//for (var i=0; i<a.length; i++) if(a[i] != 'и') b+=a[i].substr(0,1).toUpperCase();
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