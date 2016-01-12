'use strict';

angular.module("siApp")
.controller("yearlyCtrl", ['$scope', '$location', '$timeout', '$compile', 'Dashboard', function($scope, $location, $timeout, $compile, Dashboard){
	
	if(new Date().getMonth() >= 9) var year = new Date().getYear() + 1900;
	else var year = new Date().getYear() + 1899;

	var today = new Date();
	$scope.today = "y"+(today.getYear()+1900)+"m"+(today.getMonth()+1)+"d"+today.getDate();
	var inPast = true;
	
	$scope.winterSemesterYear = year;

	var months = [];

	var month = 9;

	for(var counter = 0; counter < 13; counter++) {
		var cal = [];
		var d = moment("1 " + month + " " + year, "DD MM YYYY") // displayed month

		//$scope.monthTitle = d.format("MMMM YYYY");

		var prevMonthDate = moment(d.format()).subtract(1, 'months');
		var nextMonthDate = moment(d.format()).add(1, 'months');

		var lastDayPrev = prevMonthDate.daysInMonth() // last day of previous month
		var firstWeekDay = d.isoWeekday() // weekday od first day of displayed month

		// write days of previous month
		for(var i = lastDayPrev - firstWeekDay + 2; i <= lastDayPrev; i++){
		    cal.push({
		    	date: i, 
		    	month: prevMonthDate.month()+1,
		    	year: prevMonthDate.year(),
		    	type: 'prevMonth', 
		    	events: [],
		    	background: 'white'
		    })
		}
		
		var lastDayCur = d.daysInMonth(); // last day of displayed month
		
		// write days of displayed month
		for(var i = 1; i <= lastDayCur; i++){
			if( $scope.today == "y"+d.year()+"m"+(d.month()+1)+"d"+i ) inPast = false;
			cal.push({
				date: i, 
				month: d.month()+1,
				year: d.year(),
				type: 'currentMonth', 
		    	events: [],
		    	background: 'white', 
		    	past: inPast
			})
		}
		
		var lastWeekDay = moment(lastDayCur + " " + month + " " + year, "DD MM YYYY").isoWeekday() // weekday of last day of displayed month
		
		// write days of next month
		for(var i = 1; i <= 7 - lastWeekDay; i++){
			cal.push({
		    	date: i, 
		    	month: nextMonthDate.month()+1,
		    	year: nextMonthDate.year(),
		    	type: 'nextMonth', 
		    	events: [],
		    	background: 'white'
		    })
		}
		//console.log(cal);

		var events = Dashboard.getGlobalEvents();

		for(var i=0; i<events.length; i++){

			var currentDate = new Date(events[i].datetime.startsAt);
			var stopDate = new Date(events[i].datetime.endsAt);
			while (currentDate <= stopDate) {
				var tmpDate = new Date(currentDate);
				var dd = tmpDate.getDate();
				var mm = tmpDate.getMonth() +1;
				var yy = tmpDate.getYear() + 1900;
				
				//var el = angular.element("#m"+mm+"d"+dd)
				var dateindex = _.findIndex(cal, function(day) {
					return (day.date == dd && day.month == mm && day.year == yy);
				});
				if(dateindex >= 0) {
					cal[dateindex].events.push(events[i].type);
					if(cal[dateindex].events.length > 1) {
						cal[dateindex].background = 'multi';
					}
					else {
						cal[dateindex].background = typeToClass(events[i].type);
					}
				}
				currentDate.setDate(currentDate.getDate()+1)
			}
		}


		// divide into subarrays of 7 days
		cal =  _.compact(cal.map(function(el, i){
		    if (i % 7 === 0) {
		        return cal.slice(i, i + 7);
		    }
		}));

		months.push({
			number: month,
			name: d.format("MMMM"),
			days: cal
		});

		if(month == 12) { month = 1; year++; }
		else { month++; }
	}

	//console.log(months);

	//$timeout(function(){
		$scope.months = months;
	//}, 400);

	
}])
;