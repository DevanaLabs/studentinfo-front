'use strict';

angular.module('siApp').controller('scheduleCtrl', ['$scope', 'dataExchangeService', 'dataService', '$compile', '$element', '$timeout', 'groupShitService', '$http', 
											function($scope, dataExchangeService, dataService, $compile, $element, $timeout, groupShitService, $http){
	//this.stuff = {"id":1,"name":"302","year":3,"lectures":[{"id":1,"type":"Predavanje","course":{"id":1,"code":"M1","name":"Predmet 1","semester":3,"espb":5,"lectures":[],"students":[],"events":[]},"professor":{"id":1,"firstName":"Nebojsa","lastName":"Urosevic","title":"drmr","lectures":[]},"classroom":{"id":1,"name":"e12","directions":"levo","floor":7,"lectures":[],"events":[]},"students":[],"groups":[],"notifications":[{"id":1,"description":"blejaNaLecture","expiresAt":"2016-01-29T15:00:00+0000"}],"startsAt":"2016-01-29T15:00:00+0000","endsAt":"2016-01-29T18:00:00+0000"}],"events":[{"id":1,"type":"KLK2","description":"nenadoknadiv klk2","startsAt":"2016-02-29T15:00:00+0000","endsAt":"2016-02-29T18:00:00+0000","notifications":[{"id":2,"description":"blejaNaEventu","expiresAt":"2016-01-29T15:00:00+0000"}],"classrooms":[]}]};
	$scope.stuff = {};//{"id":1,"name":"302","year":3,"lectures":[{"id":1,"type":"Predavanje","course":{"id":1,"code":"M1","name":"Predmet 1","semester":3,"espb":5,"lectures":[],"students":[],"events":[]},"professor":{"id":1,"firstName":"Nebojsa","lastName":"Urosevic","title":"drmr","lectures":[]},"classroom":{"id":1,"name":"e12","directions":"levo","floor":7,"lectures":[],"events":[]},"students":[],"groups":[],"notifications":[{"id":1,"description":"blejaNaLecture","expiresAt":"2016-01-29T15:00:00+0000"}],"startsAt":"2016-01-29T15:00:00+0000","endsAt":"2016-01-29T18:00:00+0000"}],"events":[{"id":1,"type":"KLK2","description":"nenadoknadiv klk2","startsAt":"2016-02-29T15:00:00+0000","endsAt":"2016-02-29T18:00:00+0000","notifications":[{"id":2,"description":"blejaNaEventu","expiresAt":"2016-01-29T15:00:00+0000"}],"classrooms":[]}]};
	//console.log(dataExchangeService);
	$scope.dailyStuff = ['', [], [], [], [], [], [], []];
	$scope.name = dataExchangeService.name;
	$scope.type = dataExchangeService.type;
	$scope.displayedId = dataExchangeService.id;
	$scope.notifs = 0;
	if(dataExchangeService.type == 'group')
		//$http.get('http://10.0.23.4:2200/group/'+dataExchangeService.id).then(function (data) {
		dataService.groupData(dataExchangeService.id).get({id: dataExchangeService.id}).$promise.then(function (data) {
			console.log(data.success.data);
			$scope.stuff = data.success.data.group;
			// sort to daily stuff and count notifs
			for(var i=0; i<$scope.stuff.lectures.length; i++) {
				var d = new Date($scope.stuff.lectures[i].startsAt);
				$scope.dailyStuff[d.getDay()].push($scope.stuff.lectures[i]);
				//if($scope.stuff.lectures[i].notifications.length > 0) $scope.notifs++;
			}
			//console.log($scope.dailyStuff);
		});
	else if(dataExchangeService.type == 'classroom')
		dataService.classroomData(dataExchangeService.id).get({id: dataExchangeService.id}).$promise.then(function (data) {
			//console.log(data.success.data);
			$scope.stuff = data.success.data.classroom;
			// sort to daily stuff and count notifs
			for(var i=0; i<$scope.stuff.lectures.length; i++) {
				var d = new Date($scope.stuff.lectures[i].startsAt);
				$scope.dailyStuff[d.getDay()].push($scope.stuff.lectures[i]);
				//if($scope.stuff.lectures[i].notifications.length > 0) $scope.notifs++;
			}
			//console.log($scope.dailyStuff);
		});
	else if(dataExchangeService.type == 'teacher')
		dataService.teacherData(dataExchangeService.id).get({id: dataExchangeService.id}).$promise.then(function (data) {
			console.log(data.success.data);
			$scope.stuff = data.success.data.teacher;
			// sort to daily stuff and count notifs
			for(var i=0; i<$scope.stuff.lectures.length; i++) {
				var d = new Date($scope.stuff.lectures[i].startsAt);
				$scope.dailyStuff[d.getDay()].push($scope.stuff.lectures[i]);
				//if($scope.stuff.lectures[i].notifications.length > 0) $scope.notifs++;
			}
			//console.log($scope.dailyStuff);
		});
	//console.log("Stuff", $scope.stuff);
	//dataExchangeService.type = 'classroom';
	//console.log(dataExchangeService);
	$scope.openModal = function(type, elementid){
		console.log("openModal()  type: ", type, "ID: ", elementid);
		//var a = elementid.split(' ');
		//var b = ""
		//for (var i=0; i<a.length; i++) if(a[i] != 'и') b+=a[i].substr(0,1).toUpperCase();
		var el = $compile( "<si-modal id='displayedModal' elementid='"+ elementid +"' type='"+ type +"'></si-modal>" )( $scope );
		$element.parent().append( el );
		$timeout(function() {
		    angular.element("#displayedModal").addClass("displayedModal");
		}, 100);
	};
	$scope.closeModal = function(title){
		angular.element("#displayedModal").removeClass("displayedModal");
		$timeout(function() {
		    angular.element("#displayedModal").remove();
		}, 600);
	};
}]);