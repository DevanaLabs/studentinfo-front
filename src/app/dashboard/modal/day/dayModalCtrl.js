'use strict';

angular.module('siApp.dashboard')
  .controller('DayModalCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'Months', 'CourseEventsD', 
  function ($rootScope, $scope, $state, $stateParams, $translate, Months, CourseEventsD) {
    $scope.$stateParams = $stateParams;
    var date = moment().year($stateParams.year).month($stateParams.month-1).date($stateParams.date);
    $scope.day = Months.getDay($stateParams.year, $stateParams.month, $stateParams.date);
    console.log($scope.day);
    $scope.title = date.format('DD. MMMM YYYY.');
    $scope.courseEvents = CourseEventsD.getForDay(date);
    $scope.goToDay = function (target) {
      console.log($stateParams);
      var tmp = moment().year($stateParams.year*1).month($stateParams.month*1 - 1).date($stateParams.date*1);
      console.log(tmp);
      tmp.add(target*1, 'days');
      console.log(tmp);
      $state.go('dashboard.day', {'date': tmp.date(), 'month': tmp.month()+1, 'year': tmp.year()});
    }
  }]);
 