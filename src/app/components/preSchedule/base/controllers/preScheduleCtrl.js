'use strict';

angular.module('siApp')
.controller('PreScheduleCtrl', ['$scope', 'FetchDataService', function($scope, FetchDataService) {
	this.asdf = 'asdf'
	$scope.filterData = {};
	var yearsTranslate = ["Нулта година(?)", "Прва година", "Друга година", "Трећа година", "Четврта година"];
	var floorsTranslate = ["Приземље", "Први спрат", "Други спрат", "Трећи спрат", "Четврти спрат", "Пети спрат", "Шести спрат", "Седми спрат", "Осми спрат"];
	$scope.displayedFilter = "years";
	$scope.displayedSubFilter = 3;
	
	FetchDataService.get().$promise.then(function (data) {
		$scope.data = data.success['data'];
		console.log("Full request data: ", data.success.data);

		var years = [];
		for(var i=0; i<data.success.data.groups.length; i++){
			if(years.indexOf(yearsTranslate[data.success.data.groups[i].year]) == -1) years.push(yearsTranslate[data.success.data.groups[i].year]);
		}
		$scope.filterData.years = years;

		var floors = [];
		for(var i=0; i<data.success.data.classrooms.length; i++){
			if(floors.indexOf(floorsTranslate[data.success.data.classrooms[i].floor]) == -1) floors.push(floorsTranslate[data.success.data.classrooms[i].floor]);
		}
		$scope.filterData.floors = floors;
		
		console.log("Floors filter array: ", floors);
		console.log("Years filter array: ", years);

		console.log("Current filter data", $scope.filterData[$scope.displayedFilter]);
	});
	$scope.switchFilter = function(targetF) {
		$scope.displayedFilter = targetF;
	}
}])