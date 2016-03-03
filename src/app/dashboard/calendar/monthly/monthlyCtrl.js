'use strict';

angular.module('siApp.dashboard')
  .controller('MonthlyCtrl', ['$scope', '$state', '$stateParams', '$translate', 'GlobalEventsD', 'DateTimeConverter', 'Months',
  function ($scope, $state, $stateParams, $translate, GlobalEventsD, DateTimeConverter, Months) {
    $scope.monthData = Months.getMonth($stateParams.month, $stateParams.year);
    $scope.year = $stateParams.year;
    $scope.goToMonth = function (target) {
      var tmp = moment().date(1).month($stateParams.month*1 - 1).year($stateParams.year*1);
      tmp.add(target*1, 'months');
      var range = Months.getSchoolYearRange();
      if (tmp > range.start && tmp < range.end) {
        $state.go('dashboard.monthly', {'month': tmp.month()+1, 'year': tmp.year()});
      }
    };
  }])
  .filter('typeToClass', ['CLASS_COLOR_MAP', function(CLASS_COLOR_MAP) { 
    return function(type) {
      var classMap = CLASS_COLOR_MAP;
      if (classMap[type] === -1) {
        return "yellow";
      }
      else {
        return classMap[type];
      }
    };
  }]);
