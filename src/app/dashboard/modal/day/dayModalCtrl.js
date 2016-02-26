'use strict';

angular.module('siApp.dashboard')
  .controller('DayModalCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'Months', 'CourseEventsD', 
  function ($rootScope, $scope, $state, $stateParams, $translate, Months, CourseEventsD) {
    $scope.$stateParams = $stateParams;
    var date = moment().year($stateParams.year).month($stateParams.month-1).date($stateParams.date);
    $scope.day = Months.getDay($stateParams.year, $stateParams.month, $stateParams.date);
    $scope.title = date.format('DD. MMMM YYYY.');
    $scope.courseEvents = CourseEventsD.getForDay(date);
  }]);
 