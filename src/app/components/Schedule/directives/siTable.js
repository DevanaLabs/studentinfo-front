'use strict';

angular.module('siApp')
	.directive('siTable', [function(){
		return {
			scope: '',
			replace: true,
			templateUrl: 'app/components/Schedule/views/siTable.html',
			link: function ($scope, element, attr){
				$scope.makeBig = function() {
					element[0].className += " displayed";
				}
			}
		};
	}]);