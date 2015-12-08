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
.controller('ClassroomCtrl', ['$scope', 'ClassroomService', 'ProfessorService', 'GroupService', 'FetchDataService', function ClassroomCtrl($scope, ClassroomService, ProfessorService, GroupService, FetchDataService) {
	FetchDataService.get().$promise.then(function (data) {
		$scope.data = data.success['data'];
		console.log(data.success.data);
		var years = [];
		for(var i=0; i<data.success.data.groups.length; i++){
			if(years.indexOf(data.success.data.groups[i].year) == -1) years.push(data.success.data.groups[i].year);
		}
		FetchDataService.years = years;
		var floors = [];
		for(var i=0; i<data.success.data.classrooms.length; i++){
			if(floors.indexOf(data.success.data.classrooms[i].floor) == -1) floors.push(data.success.data.classrooms[i].floor);
		}
		FetchDataService.years = years;
	});

	ClassroomService.get({id:1}).$promise.then( function (data) {
		console.log(data.success.data);
		$scope.classrooms = data.success['data'];
	});

	ProfessorService.get({id:1}).$promise.then(function (data) {
		console.log(data.success.data);
		$scope.professors = data.success['data'];
	});

	GroupService.get({id:1}).$promise.then(function (data) {
		console.log(data.success.data);
		$scope.groups = data.success['data'];
	});
}]);