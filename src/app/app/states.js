'use strict';

angular.module('siApp')
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise("/");

	//$httpProvider.defaults.withCredentials = true;
	//$httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
	//$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	
	$stateProvider
		.state("root", {
			url: "/", 
			template: ''
		})
		.state("preSchedule", {
			url: "/preSchedule", 
			templateUrl: 'app/components/preSchedule/base/views/preSchedule-base.html',
			controller: 'PreScheduleCtrl'
		})
		.state("preSchedule.groups", {
			url: "/groups", 
			templateUrl: 'app/components/preSchedule/groups/views/groups.html'
		})
		.state("preSchedule.classrooms", {
			url: "/classrooms", 
			templateUrl: 'app/components/preSchedule/classrooms/views/classrooms.html'
		})
		.state("preSchedule.teachers", {
			url: "/teachers", 
			templateUrl: 'app/components/preSchedule/teachers/views/teachers.html'
		})
		.state("test", {
			url: "/test",
			templateUrl : 'app/testtemple.html'
		})
		.state("calendar", {
			url: "/calendar", 
			templateUrl: 'app/components/calendar/base/views/cal-base.html'
		})
		.state("calendar.month", {
			url: "/month", 
			templateUrl: 'app/components/calendar/month/views/monthly-base.html',
			onEnter: function($location, $timeout) {
				var date = new Date();
				var currentMonth = (date.getYear() == 115) ? (date.getMonth() + 1) : (date.getMonth() + 13 );
				//console.log(a);
				//console.log("next: " + ($location.path().substr(17)*1+1));
				currentMonth = "/months/" + currentMonth + ""
				$timeout(function(){$location.path(currentMonth)}, 10);

				// $state.go('months({monNumber: a})')
			}
		})
		.state("yearly", {
			url: "/yearly", 
			templateUrl: 'app/components/calendar/yearly/views/yearly.html'
		})
		.state("months", {
			url: "/monthly/:year/:month", 
			templateUrl: 'app/components/calendar/months/views/month.html'
		})
		.state("about", {
			url: "/about", 
			templateUrl: 'app/components/about/views/about.html'
		})
		;
}]);