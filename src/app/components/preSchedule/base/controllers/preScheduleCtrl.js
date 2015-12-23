'use strict';

angular.module('siApp')
.controller('PreScheduleCtrl', ['$scope', 'dataService', 'filterDataService', '$timeout', 'Dashboard', function($scope, dataService, filterDataService, $timeout, Dashboard) {
	
	$scope.elementExists = function (id) {
		var element = angular.element("#" + id);
		return element.length;
	};

	$scope.scrollTo = function(letter) { 
		if($scope.elementExists(letter)){
			$scope.switchSubFilter(letter);
			angular.element("#pickersWrapper").scrollTop(angular.element("#"+letter)[0].offsetTop - 200);
		}
	};

	$scope.filterData = {};
	$scope.untranslatedData = {};
	$scope.displayedFilter = 'years';
	$scope.displayedSubFilter = 1;

	var fD = Dashboard.getFilteringData();
	$scope.filterData = fD.filterData;
	$scope.untranslatedData = fD.untranslatedData;
	
	$scope.data = Dashboard.getFilterData();

	$scope.switchFilter = function(targetF) {
		$scope.displayedFilter = targetF;
		if(targetF == "years"){
			$scope.displayedSubFilter = $scope.untranslatedData[targetF][1];
		}
		else {
			$scope.displayedSubFilter = $scope.untranslatedData[targetF][0];
		}
	};

	$scope.switchSubFilter = function(targetSF) {
		$scope.displayedSubFilter = targetSF;
	};

}]);

if(document.getElementById("pickersWrapper")){
	document.getElementById("pickersWrapper").onscroll = function() {
		var letters = document.getElementsByClassName("teacherLetter");
		var pos = document.getElementById("pickersWrapper").scrollTop;
		for(i=0; i<letters.length; i++) {
		    if(letters[i].offsetTop -200 >= pos) {
		    	$(".topFilterWrapper.sub.active").removeClass('active');
		        document.getElementById("topsub"+letters[i].id).className += ' active';
		    	break; 
		    }
		}
	}
}