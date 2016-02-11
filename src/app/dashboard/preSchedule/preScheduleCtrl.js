'use strict';

angular.module('siApp.dashboard')
  .controller('PreScheduleCtrl', ['$rootScope', '$scope', '$state', 
  function ($rootScope, $scope, $state) {
    $scope.state = function (state) {
      return $state.is(state);
    };
  }]);
 