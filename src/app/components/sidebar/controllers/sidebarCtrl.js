'use strict';

angular.module("siApp")
.controller("sidebarCtrl", ['$scope', '$state', function ($scope, $state) {
	$scope.date = new Date();
	$scope.state = function (state) {return $state.is(state); }
}])
.filter('currentdate',['$filter',  function($filter) {
    return function() {
    	//var m = ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"];
    	var m = ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"];
    	//var d = ["", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота", "Недеља"];
    	var d = ["", "понедељак", "уторак", "среда", "четвртак", "петак", "субота", "недеља"];
        return $filter('date')(new Date(), 'H:mm - d. ') + m[new Date().getMonth()]  + ", " + d[new Date().getDay()];
    };
}]);