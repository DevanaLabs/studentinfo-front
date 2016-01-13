'use strict';

angular.module("siApp")
.service('Dashboard', ['$cachedResource', '$timeout', 'API_BASE_URL', 'dataExchangeService', function ($cachedResource, $timeout, API_BASE_URL, dataExchangeService) {
	var json;
	if(localStorage.getItem("cachedResource://data")) {
		json = JSON.parse(localStorage.getItem("cachedResource://data")).value.success.data;
	}

	refreshData();

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

		var years = [];
		for(var i=0; i<json.groups.length; i++){
			if(years.indexOf(json.groups[i].year) == -1) years.push(json.groups[i].year);
		}
		// sort and translate
		years.sort(function(a,b){
			if(b==0) return -1; // put other years on end
			else return a-b;
		});
		untranslatedData.years = years;
		filterData.years = years;

		var floors = [];
		for(i=0; i<json.classrooms.length; i++){
			if(floors.indexOf(json.classrooms[i].floor) == -1) floors.push(json.classrooms[i].floor);
		}
		// sort and translate
		floors.sort(function(a,b){return a-b;});
		untranslatedData.floors = floors;
		filterData.floors = floors;


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
				    	var lecture = $.extend(true, {}, json[dataExchangeService.type+'s'][i].lectures[k]);
				    	lecture.startsAt = (moment().day(1).hour(0).minute(0).second(0).add(json[dataExchangeService.type+'s'][i].lectures[k].time.startsAt, 'seconds')).format();
				    	lecture.endsAt = (moment().day(1).hour(0).minute(0).second(0).add(json[dataExchangeService.type+'s'][i].lectures[k].time.endsAt, 'seconds')).format();
						return lecture;
					}
				}
			}
		}
	}

	function getSchedule(type, id) {
		//return json[type+'s'][id-1].lectures;
		var schedule = [];
		for(var i=0; i<json[type+'s'].length; i++){
			if(json[type+'s'][i].id == id){
				for(var j=0; j<json[type+'s'][i].lectures.length; j++){
					json[type+'s'][i].lectures[j].startsAt = (moment().day(1).hour(0).minute(0).second(0).add(json[type+'s'][i].lectures[j].time.startsAt, 'seconds')).format();
					json[type+'s'][i].lectures[j].endsAt = (moment().day(1).hour(0).minute(0).second(0).add(json[type+'s'][i].lectures[j].time.endsAt, 'seconds')).format();
					schedule[j] = $.extend( true, {}, json[type+'s'][i].lectures[j] );
				}
				return schedule;
			}
		}
	}

	function getGlobalEvents() {
		return json.globalEvents;
	}

	function getGlobalEventsForDay(year, month, day) {
		var inputdate = new Date(year+"-"+month+"-"+day);
		var events = [];
		for(var i=0; i<json.globalEvents.length; i++){
			var startdate = new Date(json.globalEvents[i].datetime.startsAt);
			var enddate = new Date(json.globalEvents[i].datetime.endsAt);
			if(inputdate.getTime()+14400000 >= startdate && inputdate <= enddate) {
			    events.push(json.globalEvents[i]);
			}
		}
		return events;
	}

	function getCourseEvents() {
		return json.courseEvents;
	}

	function getCourseEventsForDay(year, month, day) {
		var events = [];
		for(var i=0; i<json.courseEvents.length; i++){
			var mm = json.courseEvents[i].datetime.startsAt.substr(5, 2)*1;
			var yy = json.courseEvents[i].datetime.startsAt.substr(8, 4)*1;
			if(json.courseEvents[i].datetime.startsAt.substr(5, 2)*1 == month &&
				json.courseEvents[i].datetime.startsAt.substr(0, 4)*1 == year &&
			    json.courseEvents[i].datetime.startsAt.substr(8, 2)*1 == day) {
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
		getGlobalEventsForDay: getGlobalEventsForDay,
		getCourseEvents: getCourseEvents,
		getCourseEventsForDay: getCourseEventsForDay
	};
}]);