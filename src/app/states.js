'use strict';

angular.module('siApp')
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

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
			onEnter: function($location) {
				var d = new Date();
				var a = (d.getYear() == 115) ? (d.getMonth() + 1) : (d.getMonth() + 13 );
				console.log(a);
				$location.path($location.path() + "/" + a);
			}
		})
		.state("calendar.month.test", {
			url: "/:monNumber", 
			templateUrl: function($stateParams) { return 'app/components/calendar/month/views/months/'+ $stateParams.monNumber +'.html' }/*,
			controller: 'PreScheduleCtrl'*/
		})
		;
});