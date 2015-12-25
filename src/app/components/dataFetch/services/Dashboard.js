'use strict';

angular.module("siApp")
.service('Dashboard', ['$cachedResource', '$timeout', 'API_BASE_URL', 'dataExchangeService', function ($cachedResource, $timeout, API_BASE_URL, dataExchangeService) {
	refreshData();

	var json = JSON.parse(localStorage.getItem("cachedResource://data")).value.success.data;
	
	function refreshData() {
		//console.log("Refreshing data...");
		var jsonPromise = $cachedResource('data', (API_BASE_URL + 'data/'));
		jsonPromise.get().$promise.then(function(data){
			//console.log(data.success.data);
			json = data.success.data;
			//console.log("Done refreshing data...");
		});
		$timeout(function(){refreshData()}, 5*60*1000);
	}

	function getAll() {
		return json;
	}

	function getFilteringData() {
		// put years in array
		var filterData = {};
		var untranslatedData = {};

		var yearsTranslate = ["Остало", "Прва година", "Друга година", "Трећа година", "Четврта година"];
		// temp fix for filtering other groups
		yearsTranslate[9] = "Остало";
		var floorsTranslate = ["Приземље", "Први спрат", "Други спрат", "Трећи спрат", "Четврти спрат", "Пети спрат", "Шести спрат", "Седми спрат", "Осми спрат", "Девети спрат", "Десети спрат", "Једанаести спрат", "Дванаести спрат"];

		var years = [];
		for(var i=0; i<json.groups.length; i++){
			// temp fix for filtering other groups
			if(json.groups[i].year === 100) json.groups[i].year = 9;
			if(years.indexOf(json.groups[i].year) == -1) years.push(json.groups[i].year);
		}
		// sort and translate
		years.sort(function(a,b){return a-b;});
		untranslatedData.years = years;
		var yearsTr = [];
		for(i = 0; i<years.length; i++){
			yearsTr[i] = yearsTranslate[years[i]];
		}
		filterData.years = yearsTr;

		var floors = [];
		for(i=0; i<json.classrooms.length; i++){
			if(floors.indexOf(json.classrooms[i].floor) == -1) floors.push(json.classrooms[i].floor);
		}
		// sort and translate
		floors.sort(function(a,b){return a-b;});
		untranslatedData.floors = floors;
		var floorsTr = [];
		for(i = 0; i<floors.length; i++)
			floorsTr[i] = floorsTranslate[floors[i]];
		filterData.floors = floorsTr;


		var azbuka = ["А", "Б", "В", "Г", "Д", "Ђ", "Е", "Ж", "З", "И", "Ј", "К", "Л", "Љ", "М", "Н", "Њ", "О", "П", "Р", "С", "Т", "Ћ", "У", "Ф", "Х", "Ц", "Ч", "Џ", "Ш"];
		var abc = {"А": [], "Б": [], "В": [], "Г": [], "Д": [], "Ђ": [], "Е": [], "Ж": [], "З": [], "И": [], "Ј": [], "К": [], "Л": [], "Љ": [], "М": [], "Н": [], "Њ": [], "О": [], "П": [], "Р": [], "С": [], "Т": [], "Ћ": [], "У": [], "Ф": [], "Х": [], "Ц": [], "Ч": [], "Џ": [], "Ш": []};
		filterData.abc = Object.keys(abc);
		untranslatedData.abc = filterData.abc;

		filterData.abc = azbuka;
		untranslatedData.abc = azbuka;

		//console.log($scope.data.teachers);

		//console.log($scope.filterData.abc);

		return {
			filterData: filterData,
			untranslatedData: untranslatedData
		}
	}

	function getFilterData () {
		var fD = {
			groups: [],
			classrooms: []
		};

		//var azbuka = ["А", "Б", "В", "Г", "Д", "Ђ", "Е", "Ж", "З", "И", "Ј", "К", "Л", "Љ", "М", "Н", "Њ", "О", "П", "Р", "С", "Т", "Ћ", "У", "Ф", "Х", "Ц", "Ч", "Џ", "Ш"];
		var abc = {"А": [], "Б": [], "В": [], "Г": [], "Д": [], "Ђ": [], "Е": [], "Ж": [], "З": [], "И": [], "Ј": [], "К": [], "Л": [], "Љ": [], "М": [], "Н": [], "Њ": [], "О": [], "П": [], "Р": [], "С": [], "Т": [], "Ћ": [], "У": [], "Ф": [], "Х": [], "Ц": [], "Ч": [], "Џ": [], "Ш": []};
		
		var tch = json.teachers;
		tch.sort(function(a,b){
			return (new Intl.Collator('rs').compare(a.lastName, b.lastName));
		});
		for(var i=0; i<json.teachers.length; i++) {
			//if(json.teachers[i].lectures.length > 0) {}
				abc[ json.teachers[i].lastName.substr(0,1) ].push(json.teachers[i]);
		}
		fD.teachers = abc;
		for(i=0; i<json.groups.length; i++){
			// temp fix for filtering other groups
			if(json.groups[i].year === 100) json.groups[i].year = 9;
			fD.groups.push(json.groups[i]);
		}
		for(i=0; i<json.classrooms.length; i++){
			fD.classrooms.push(json.classrooms[i]);
		}
		//console.log(fD.teachers['У'][0]);
		//console.log("abc", abc);
		return fD;
	}

	function getClassrooms() {
		return json.classrooms;
	}

	function getGroups() {
		return json.groups;
	}

	function getGroup(id) {
		for(var i=0; i<json.groups.length; i++){
		    if(json.groups[i].id == id) {
				return json.groups[i];
			}
		}
	}

	function getLecture(lectid, gpid) {
		for(var i=0; i<json[dataExchangeService.type+'s'].length; i++){
		    if(json[dataExchangeService.type+'s'][i].id == gpid) {
				for(var k=0; k<json[dataExchangeService.type+'s'][i].lectures.length; k++){
				    if(json[dataExchangeService.type+'s'][i].lectures[k].id == lectid) {
						return json[dataExchangeService.type+'s'][i].lectures[k];
					}
				}
			}
		}
	}

	function getSchedule(type, id) {
		//return json[type+'s'][id-1].lectures;
		for(var i=0; i<json[type+'s'].length; i++){
			if(json[type+'s'][i].id == id) return json[type+'s'][i].lectures;
		}
	}

	function getGlobalEvents() {
		return json.globalEvents;
	}

	function getCourseEvents() {
		return json.courseEvents;
	}

	function getCourseEventsForDay(month, day) {
		var events = [];
		for(var i=0; i<json.courseEvents.length; i++){
			if(json.courseEvents[i].startsAt.substr(2,2) == 115){ var mm = json.courseEvents[i].startsAt.substr(5, 2)*1; }
			else { var mm = json.courseEvents[i].startsAt.substr(5, 2)*1 + 12; }
			if(mm == month &&
			    json.courseEvents[i].startsAt.substr(8, 2)*1 == day) {
			    events.push(json.courseEvents[i]);
			}
		}
		return events;
	}

	

	return {
		refreshData: refreshData,
		getAll: getAll,
		getFilterData: getFilterData,
		getFilteringData: getFilteringData,
		getSchedule: getSchedule,
		getGroups: getGroups,
		getGroup: getGroup,
		getLecture: getLecture,
		getGlobalEvents: getGlobalEvents,
		getCourseEvents: getCourseEvents,
		getCourseEventsForDay: getCourseEventsForDay
	};
}]);