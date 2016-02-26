'use strict';

angular.module('siApp.dashboard')
  .controller('YearlyCtrl', ['$scope', '$translate', 'GlobalEventsD', 'Months',
  function ($scope, $translate, GlobalEventsD, Months) {
    $scope.currentSchoolYear = Months.getSchoolYear();
    $scope.months = Months.getAll();
    $scope.openMonth = function(index) {
      if(index < 4) {
        return {'year':$scope.currentSchoolYear, 'month': (9 + index)};
      }
      else {
        return {'year':($scope.currentSchoolYear+1), 'month': (index - 3)};
      }
    }

  }]);
