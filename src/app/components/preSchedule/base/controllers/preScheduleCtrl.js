'use strict';

angular.module('siApp')
.controller('PreScheduleCtrl', ['$scope', 'FetchDataService', function($scope, FetchDataService) {
	$scope.filterData = {};
	$scope.untranslatedData = {};
	var yearsTranslate = ["Нулта година(?)", "Прва година", "Друга година", "Трећа година", "Четврта година"];
	$scope.yearsTranslate = yearsTranslate;
	var floorsTranslate = ["Приземље", "Први спрат", "Други спрат", "Трећи спрат", "Четврти спрат", "Пети спрат", "Шести спрат", "Седми спрат", "Осми спрат", "Девети спрат", "Десети спрат", "Једанаести спрат", "Дванаести спрат"];
	$scope.floorsTranslate = floorsTranslate;
	$scope.displayedFilter = "years";
	$scope.displayedSubFilter = 1;
	
	FetchDataService.get().$promise.then(function (data) {
		$scope.data = data.success.data;
		//console.log("Full request data: ", data.success.data);

		// put years in array
		var years = [];
		for(var i=0; i<data.success.data.groups.length; i++){
			if(years.indexOf(data.success.data.groups[i].year) == -1) years.push(data.success.data.groups[i].year);
		}
		// sort and translate
		years.sort(function(a,b){return a-b;});
		$scope.untranslatedData.years = years;
		var yearsTr = [];
		for(i = 0; i<years.length; i++)
			yearsTr[i] = yearsTranslate[years[i]];
		$scope.filterData.years = yearsTr;


		// put floors in array 
		var floors = [];
		for(i=0; i<data.success.data.classrooms.length; i++){
			if(floors.indexOf(data.success.data.classrooms[i].floor) == -1) floors.push(data.success.data.classrooms[i].floor);
		}
		// sort and translate
		floors.sort(function(a,b){return a-b;});
		$scope.untranslatedData.floors = floors;
		var floorsTr = [];
		for(i = 0; i<floors.length; i++)
			floorsTr[i] = floorsTranslate[floors[i]];
		$scope.filterData.floors = floorsTr;
		

		//console.log("Floors filter array: ", floors);
		//console.log("Years filter array: ", years);

		//console.log("Current filter data", $scope.filterData[$scope.displayedFilter]);
	});
	$scope.switchFilter = function(targetF) {
		$scope.displayedFilter = targetF;
		$scope.displayedSubFilter = $scope.untranslatedData[targetF][0];
	};
	$scope.switchSubFilter = function(targetSF) {
		$scope.displayedSubFilter = targetSF;
	};
}]);