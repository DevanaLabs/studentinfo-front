'use strict';

angular.module('siApp')
.controller('PreScheduleCtrl', ['$scope', '$timeout', 'Dashboard', function($scope, $timeout, Dashboard) {
	console.log(Dashboard.getAll());
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
		$scope.displayedSubFilter = $scope.untranslatedData[targetF][0];
	};

	$scope.switchSubFilter = function(targetSF) {
		console.log(targetSF);
		$scope.displayedSubFilter = targetSF;
	};

}])
.filter( 'yearsTranslate',  [ function () {    
        var yearsMap = {
            "1" : "Прва година",
            "2" : "Друга година",
            "3" : "Трећа година",
            "4" : "Четврта година"
      };

      function translateYearFilter(year) {
        if ( yearsMap[year] ) {
       		return yearsMap[year];
	    } else {
	        return "Остало";
	    }
      }

        return translateYearFilter;
    }])
.filter( 'classroomsTranslate',  [ function () {    
        var classroomsMap = {
        	"-1" : "Подрум",
            "0" : "Приземље",
            "1" : "Први спрат",
            "2" : "Други спрат",
            "3" : "Трећи спрат",
            "4" : "Четврти спрат",
            "5" : "Пети спрат",
            "6" : "Шести спрат",
            "7" : "Седми спрат",
            "8" : "Осми спрат",
            "9" : "Девети спрат",
            "10" : "Десети спрат",
            "11" : "Једанаести спрат",
            "12" : "Дванаести спрат",
      };

      function translateClassroomFilter(classroom) {
          return classroomsMap[classroom];
      }

        return translateClassroomFilter;
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