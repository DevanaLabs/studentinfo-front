'use strict';

angular.module("siApp")
.controller("monthCtrl", ['$scope', 'Dashboard', '$state', '$stateParams', '$compile', '$element', '$timeout', function($scope, Dashboard, $state, $stateParams, $compile, $element, $timeout){
	$scope.month = $stateParams.month; 
	$scope.year = $stateParams.year;

	var today = new Date();
	$scope.today = "y"+(today.getYear()+1900)+"m"+(today.getMonth()+1)+"d"+today.getDate();

	var cal = [];
	var d = moment("1 " + $scope.month + " " + $scope.year, "DD MM YYYY") // displayed month

	$scope.monthTitle = d.format("MMMM YYYY");

	var prevMonthDate = moment(d.format()).subtract(1, 'months');
	var nextMonthDate = moment(d.format()).add(1, 'months');

	var lastDayPrev = prevMonthDate.daysInMonth() // last day of previous month
	var firstWeekDay = d.isoWeekday() // weekday od first day of displayed month

	// write days of previous month
	for(var i = lastDayPrev - firstWeekDay + 2; i <= lastDayPrev; i++){
	    cal.push({
	    	date: i/*+"p"*/, 
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
		cal.push({
			date: i, 
			month: d.month()+1,
			year: d.year(),
			type: 'currentMonth', 
	    	events: [],
	    	background: 'white'
		})
	}
	
	var lastWeekDay = moment(lastDayCur + " " + $scope.month + " " + $scope.year, "DD MM YYYY").isoWeekday() // weekday of last day of displayed month
	
	// write days of next month
	for(var i = 1; i <= 7 - lastWeekDay; i++){
		cal.push({
	    	date: i/*+"n"*/, 
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

		var currentDate = new Date(events[i].startsAt);
		var stopDate = new Date(events[i].endsAt);
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
    }))
	//console.log(cal);

	$scope.data = cal;


	$scope.nextMonth = function () {
		var nextMonth = d.add(1, 'months');
		$state.go('months', {month: nextMonth.month()+1, year: nextMonth.year()});
	}
	$scope.prevMonth = function () {
		var nextMonth = d.subtract(1, 'months');
		$state.go('months', {month: nextMonth.month()+1, year: nextMonth.year()});
	}

	$(".monthTableWrapper").on("swiperight",function(event){
		angular.element(".monthTableWrapper").scope().prevMonth();
	});
	$(".monthTableWrapper").on("swipeleft",function(event){
		angular.element(".monthTableWrapper").scope().nextMonth();
	});

	$scope.openModal = function(y, m, d){
		var el = angular.element("#y"+y+"m"+m+"d"+d);
		$scope.color = el[0].className.split(" ")[el[0].className.split(" ").length-1];
		var el = $compile( "<si-modal id='displayedModal' year='"+ y +"' month='"+ m +"' day='"+ d +"' type='day' titlebarcolor='"+$scope.color+"'></si-modal>" )( $scope );
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


}])
.filter('typeToClass', [function() {
	return typeToClass;
}])
;

function typeToClass(type) {
	var classMap = {
		"Испитни рок" : "blue",
		"Колоквијумска недеља" : "orange",
		"Нерадни дани" : "gray",
		"Плаћање школарине" : "green"
	};
	
	if(classMap[type] === -1) {
		return "yellow";
	}
	else {
		return classMap[type];
	}
}