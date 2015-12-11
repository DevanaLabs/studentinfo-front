'use strict'

angular.module('siApp').controller('scheduleCtrl', ['$scope', 'dataExchangeService', 'GroupService', 'ClassroomService', function($scope, dataExchangeService, groupService, ClassroomService){
	//this.stuff = {"id":1,"name":"302","year":3,"lectures":[{"id":1,"type":"Predavanje","course":{"id":1,"code":"M1","name":"Predmet 1","semester":3,"espb":5,"lectures":[],"students":[],"events":[]},"professor":{"id":1,"firstName":"Nebojsa","lastName":"Urosevic","title":"drmr","lectures":[]},"classroom":{"id":1,"name":"e12","directions":"levo","floor":7,"lectures":[],"events":[]},"students":[],"groups":[],"notifications":[{"id":1,"description":"blejaNaLecture","expiresAt":"2016-01-29T15:00:00+0000"}],"startsAt":"2016-01-29T15:00:00+0000","endsAt":"2016-01-29T18:00:00+0000"}],"events":[{"id":1,"type":"KLK2","description":"nenadoknadiv klk2","startsAt":"2016-02-29T15:00:00+0000","endsAt":"2016-02-29T18:00:00+0000","notifications":[{"id":2,"description":"blejaNaEventu","expiresAt":"2016-01-29T15:00:00+0000"}],"classrooms":[]}]};
	$scope.stuff = {"id":1,"name":"302","year":3,"lectures":[{"id":1,"type":"Predavanje","course":{"id":1,"code":"M1","name":"Predmet 1","semester":3,"espb":5,"lectures":[],"students":[],"events":[]},"professor":{"id":1,"firstName":"Nebojsa","lastName":"Urosevic","title":"drmr","lectures":[]},"classroom":{"id":1,"name":"e12","directions":"levo","floor":7,"lectures":[],"events":[]},"students":[],"groups":[],"notifications":[{"id":1,"description":"blejaNaLecture","expiresAt":"2016-01-29T15:00:00+0000"}],"startsAt":"2016-01-29T15:00:00+0000","endsAt":"2016-01-29T18:00:00+0000"}],"events":[{"id":1,"type":"KLK2","description":"nenadoknadiv klk2","startsAt":"2016-02-29T15:00:00+0000","endsAt":"2016-02-29T18:00:00+0000","notifications":[{"id":2,"description":"blejaNaEventu","expiresAt":"2016-01-29T15:00:00+0000"}],"classrooms":[]}]};
	//console.log(dataExchangeService);
	$scope.dailyStuff = ['', [], [], [], [], [], [], []];
	$scope.name = dataExchangeService.name;
	$scope.type = dataExchangeService.type;
	if(dataExchangeService.type == 'group')
		groupService.get({id: dataExchangeService.id}).$promise.then(function (data) {
			//console.log(data.success.data);
			$scope.stuff = data.success.data.group;
			// sort to daily stuff
			for(var i=0; i<$scope.stuff.lectures.length; i++) {
				var d = new Date($scope.stuff.lectures[i].startsAt);
				$scope.dailyStuff[d.getDay()].push($scope.stuff.lectures[i]);
			}
			//console.log($scope.dailyStuff);
		});
	else if(dataExchangeService.type == 'classroom')
		ClassroomService.get({id: dataExchangeService.id}).$promise.then(function (data) {
			console.log(data.success.data);
			$scope.stuff = data.success.data.classroom;
			// sort to daily stuff
			for(var i=0; i<$scope.stuff.lectures.length; i++) {
				var d = new Date($scope.stuff.lectures[i].startsAt);
				$scope.dailyStuff[d.getDay()].push($scope.stuff.lectures[i]);
			}
			//console.log($scope.dailyStuff);
		});
	//console.log("Stuff", $scope.stuff);
	//dataExchangeService.type = 'classroom';
	//console.log(dataExchangeService);
}]);