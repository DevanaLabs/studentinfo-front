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
			controller: 'GroupCtrl'
		})
		.state("preSchedule.classrooms", {
			url: "/classrooms", 
			templateUrl: '/src/app/components/preSchedule/classrooms/views/classrooms.html',
			controller: 'ClassroomCtrl'
		})
		.state("preSchedule.teachers", {
			url: "/teachers", 
			templateUrl: '/src/app/components/preSchedule/teachers/views/teachers.html',
			controller: 'ProfessorCtrl'
		})
		.state("test", {
			url: "/test",
			templateUrl : '/src/app/testtemple.html',
			controller: 'ClassroomCtrl'
		});

})
.controller('GroupCtrl', ['$scope', 'FetchDataService', 'GroupService', function GroupCtrl($scope, GroupService, FetchDataService) {
	GroupService.get({id:1}).$promise.then(function (data) {
		//console.log(data.success.data);
		$scope.groups = data.success['data'];
	});
}])
.controller('ProfessorCtrl', ['$scope', 'FetchDataService', 'ProfessorService', function ProfessorCtrl($scope, ProfessorService, FetchDataService) {
	ProfessorService.get({id:1}).$promise.then(function (data) {
		//console.log(data.success.data);
		$scope.professors = data.success['data'];
	});
}])
.controller('ClassroomCtrl', ['$scope', 'FetchDataService', 'ClassroomService', function ClassroomCtrl($scope, ClassroomService, FetchDataService) {
	ClassroomService.get({id:1}).$promise.then( function (data) {
		//console.log(data.success.data);
		$scope.classroom = data.success['data'];
	});
}]);