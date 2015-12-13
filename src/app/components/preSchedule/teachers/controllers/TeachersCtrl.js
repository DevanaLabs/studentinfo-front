'use strict';

angular.module('siApp')
.controller('TeachersCtrl', ['$scope', 'FetchDataService', 'ProfessorService', function TeachersCtrl($scope, ProfessorService, FetchDataService) {
	ProfessorService.get({id:1}).$promise.then(function (data) {
		//console.log(data.success.data);
		$scope.professors = data.success.data;
	});
}]);