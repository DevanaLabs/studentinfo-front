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
.controller('ClassroomCtrl', ['$scope', 'ClassroomService', 'ProfessorService', 'GroupService', function ClassroomCtrl($scope, ClassroomService, ProfessorService, GroupService) {
	ClassroomService.get().$promise.then(function (data) {
		console.log(data.success.data);
		$scope.classrooms = data.success['data'];
	});

	ProfessorService.get().$promise.then(function (data) {
		console.log(data.success.data);
		$scope.professors = data.success['data'];
	});

	GroupService.get().$promise.then(function (data) {
		console.log(data.success.data);
		$scope.groups = data.success['data'];
		var filterSets = [];
		for(var i=0; i<data.success.data.length; i++)
			if(filterSets.indexOf(data.success.data[i].year) == -1) filterSets.push(data.success.data[i].year);
		console.log(filterSets);
		GroupService.filterSets = filterSets;
		console.log(GroupService.filterSets)
	});
}]);