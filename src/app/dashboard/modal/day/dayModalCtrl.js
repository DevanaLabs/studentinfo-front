'use strict';

angular.module('siApp.dashboard')
  .controller('DayModalCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'Months', 'CourseEventsD', 
  function ($rootScope, $scope, $state, $stateParams, $translate, Months, CourseEventsD) {
    $scope.$stateParams = $stateParams;
    var date = moment().year($stateParams.year).month($stateParams.month-1).date($stateParams.date);
    $scope.day = Months.getDay($stateParams.year, $stateParams.month, $stateParams.date);
    $scope.title = date.format('D. MMMM YYYY.');
    $scope.courseEvents = CourseEventsD.getForDay(date);
    $scope.goToDay = function (target) {
      var tmp = moment().year($stateParams.year*1).month($stateParams.month*1 - 1).date($stateParams.date*1);
      tmp.add(target*1, 'days');
      $state.go('dashboard.day', {'date': tmp.date(), 'month': tmp.month()+1, 'year': tmp.year()});
    };
  }]);
 