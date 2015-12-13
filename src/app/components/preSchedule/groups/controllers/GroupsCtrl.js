'use strict';

angular.module('siApp')
.controller('GroupsCtrl', ['$scope', 'FetchDataService', 'GroupService', function GroupsCtrl($scope, GroupService, FetchDataService) {
	GroupService.get({id:1}).$promise.then(function (data) {
		//console.log(data.success.data);
		$scope.groups = data.success.data;
	});
}]);