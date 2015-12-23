'use strict';

angular.module("siApp")
.controller("monthCtrl", ['$scope', '$location', '$timeout', '$element', '$compile', 'Dashboard', function($scope, $location, $timeout, $element, $compile, Dashboard){
		$scope.data = Dashboard.getGlobalEvents();
		var types = ["Испитни рок", "Колоквијумска недеља", "Нерадни дани", "Плаћање школарине", "Специјални догађај"];
		var classTypes = ["blue", "orange", "gray", "green", "yellow"];

		var date = new Date();
		var m = (date.getYear() == 115) ? (date.getMonth() + 1) : (date.getMonth() + 13 );
		var d = date.getDate();
		angular.element("#m"+m+"d"+d).addClass("today");


		for(var i=0; i<$scope.data.length; i++){

			var currentDate = new Date($scope.data[i].startsAt);
			var stopDate = new Date($scope.data[i].endsAt);
			while (currentDate <= stopDate) {
				var d = new Date(currentDate);
				var dd = d.getDate();
				if(d.getYear() == 115){ var mm = d.getMonth() + 1; }
				else { var mm = d.getMonth() + 13; }
				
				var el = angular.element("#m"+mm+"d"+dd)
				if(el.length > 0) {
					el.attr('ng-click', "openModal("+mm+", "+dd+")");
					el.replaceWith(el);
					$compile(el)($scope);

					if(types.indexOf($scope.data[i].type) == -1){
						var cl = 'yellow';
					}
					else {
						var cl = classTypes[types.indexOf($scope.data[i].type)];
					}
					var eventEl = $compile( "<span class=\"eventNotifCont\"><span class=\"eventNotif " + cl + "\">" + $scope.data[i].type + "</span></span>" )( $scope );
					el.append( eventEl );
					//console.log(el[0].children);
					if(el[0].children.length > 2) {
						el.addClass('multi');
					}
					else {
						el.addClass(cl);
					}
				}
				currentDate.setDate(currentDate.getDate()+1)
			}
		}

	$scope.nextMonth = function () {
		angular.element("#monthUIviewWrapper").addClass("goLeft");
		var a = $location.path().substr(0, 17) + ($location.path().substr(17)*1+1);
		$timeout(function(){$location.path(a)}, 10);
		$timeout(function(){angular.element("#monthUIviewWrapper").removeClass("goLeft");}, 350);
	}
	
	$scope.prevMonth = function () {
		angular.element("#monthUIviewWrapper").addClass("goRight");
		var a = $location.path().substr(0, 17) + ($location.path().substr(17)*1-1);
		$timeout(function(){$location.path(a)}, 10);
		$timeout(function(){angular.element("#monthUIviewWrapper").removeClass("goRight");}, 350);
	}
	
	$(".monthTableWrapper").on("swiperight",function(event){
		angular.element(".monthTableWrapper").scope().prevMonth();
	});
	$(".monthTableWrapper").on("swipeleft",function(event){
		angular.element(".monthTableWrapper").scope().nextMonth();
	});

	$scope.openModal = function(m, d){
		var el = angular.element("#m"+m+"d"+d);
		$scope.color = el[0].className.split(" ")[el[0].className.split(" ").length-1];
		console.log($scope.color);
		var el = $compile( "<si-modal id='displayedModal' month='"+ m +"' day='"+ d +"' type='day' titlebarcolor='"+$scope.color+"'></si-modal>" )( $scope );
		$element.parent().append( el );
		$timeout(function() {
		    angular.element("#displayedModal").addClass("displayedModal");
		}, 100);
	};
	$scope.closeModal = function(title){
		angular.element("#displayedModal").removeClass("displayedModal");
		$timeout(function() {
		    angular.element("#displayedModal").remove();
		}, 350);
	};


}])
;