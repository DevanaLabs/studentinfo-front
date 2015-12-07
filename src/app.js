'use strict';

// Declare app level module which depends on views, and components
angular.module('siApp', ['ngCachedResource', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state("preSchedule", {
			url: "/preSchedule", 
			templateUrl: '/src/app/components/preSchedule/base/views/preSchedule-base.html'
		})
		.state("preSchedule.groups", {
			url: "/groups", 
			templateUrl: '/src/app/components/preSchedule/groups/views/groups.html'
		})
		.state("preSchedule.classrooms", {
			url: "/classrooms", 
			templateUrl: '/src/app/components/preSchedule/classrooms/views/classrooms.html'
		})
		.state("preSchedule.teachers", {
			url: "/teachers", 
			templateUrl: '/src/app/components/preSchedule/teachers/views/teachers.html'
		})
		.state("test", {
			url: "/test",
			templateUrl : '/src/app/testtemple.html',
			controller: 'ClassroomCtrl'
		});

})
.controller('ClassroomCtrl', ['$scope', 'ClassroomService', 'ProfessorService', 'GroupService' , 'GroupYearService', function ClassroomCtrl($scope, ClassroomService, ProfessorService, GroupService, GroupYearService) {
	ClassroomService.get().$promise.then(function (data) {
		console.log(data.success.data);
		$scope.classrooms = data.success['data'];
	});

	ProfessorService.get().$promise.then(function (data) {
		console.log(data.success.data);
		$scope.professors = data.success['data'];
	});

	GroupService.get().$promise.then(function (data) {
		console.log(data.success);
		$scope.groupYears = data.success;
	});
	GroupYearService.get().$promise.then(function (data) {
		console.log(data.success);
		$scope.groups = data.success;
	});
}]);