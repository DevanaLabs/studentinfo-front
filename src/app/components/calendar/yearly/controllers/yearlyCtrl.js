'use strict';

angular.module("siApp")
.controller("yearlyCtrl", ['$scope', '$location', '$timeout', '$compile', 'Dashboard', function($scope, $location, $timeout, $compile, Dashboard){
	
	$scope.data = Dashboard.getGlobalEvents();
	var types = ["Испитни рок", "Колоквијумска недеља", "Нерадни дани", "Плаћање школарине"];
	var classTypes = ["blue", "orange", "gray", "green"];

	var date = new Date();
	var m = (date.getYear() == 115) ? (date.getMonth() + 1) : (date.getMonth() + 13 );
	var d = date.getDate();
	

	for(var i=0; i<$scope.data.length; i++){

		var currentDate = new Date($scope.data[i].startsAt);
		var stopDate = new Date($scope.data[i].endsAt);
		while (currentDate <= stopDate) {
			var newdate = new Date(currentDate);
			var dd = newdate.getDate();
			if(newdate.getYear() == 115){ var mm = newdate.getMonth() + 1; }
			else { var mm = newdate.getMonth() + 13; }
			
			var el = angular.element("#m"+mm+"d"+dd)
			if(el.length > 0) {
				if(types.indexOf($scope.data[i].type) == -1){
					var cl = 'yellow';
				}
				else {
					var cl = classTypes[types.indexOf($scope.data[i].type)];
				}
				//var eventEl = $compile( "<span class=\"eventNotifCont\"><span class=\"eventNotif " + cl + "\">" + $scope.data[i].type + "</span></span>" )( $scope );
				//el.append( eventEl );
				//console.log(el[0].children);
				if(el[0].children.length > 2) {
					el.addClass('multi');
				}
				else {
					el.addClass(cl);
				}
			}
			
			currentDate.setDate(currentDate.getDate()+1)

		}
	}
	
	if(angular.element("#m"+m+"d"+d)[0].className == "yearDayTd") {
		angular.element("#m"+m+"d"+d).addClass("today");
	}
	else {
		angular.element("#m"+m+"d"+d).addClass("todayExtra");
	}
	
	// gray out past days
	var today = ("m"+m+"d"+d);
	var days = document.getElementsByClassName("yearDayTd")
	for(i = 0; i < days.length; i++){
		if(days[i].id == today){
			break
		}
		else {
			days[i].className += " past";
		} 
	}

	
}])
;