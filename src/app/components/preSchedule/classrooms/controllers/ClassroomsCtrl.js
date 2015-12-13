'use strict';

angular.module('siApp')
.controller('ClassroomsCtrl', ['$scope', 'FetchDataService', 'ClassroomService', function ClassroomsCtrl($scope, ClassroomService, FetchDataService) {
	ClassroomService.get({id:1}).$promise.then( function (data) {
		//console.log(data.success.data);
		$scope.classroom = data.success.data;
	});
}]);