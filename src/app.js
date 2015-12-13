// Disable context menu
// dev-comment document.addEventListener('contextmenu', function(event){ event.preventDefault(); });

'use strict';

// Declare app level module which depends on views, and components
angular.module('siApp', ['ngCachedResource', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state("preSchedule", {
			url: "/preSchedule", 
			templateUrl: '/src/app/components/preSchedule/base/views/preSchedule-base.html',
			controller: 'PreScheduleCtrl'
		})
		.state("preSchedule.groups", {
			url: "/groups", 
			templateUrl: '/src/app/components/preSchedule/groups/views/groups.html',
			controller: 'GroupsCtrl'
		})
		.state("preSchedule.classrooms", {
			url: "/classrooms", 
			templateUrl: '/src/app/components/preSchedule/classrooms/views/classrooms.html',
			controller: 'ClassroomsCtrl'
		})
		.state("preSchedule.teachers", {
			url: "/teachers", 
			templateUrl: '/src/app/components/preSchedule/teachers/views/teachers.html',
			controller: 'TeachersCtrl'
		})
		.state("test", {
			url: "/test",
			templateUrl : '/src/app/testtemple.html',
			controller: 'ClassroomCtrl'
		});

})
;