'use strict';

angular.module('siApp.dashboard')
  .controller('MainDashboardCtrl', ['$rootScope', '$scope', 'Dashboard', 'EVENTS', '$state', 
    function ($rootScope, $scope, Dashboard, EVENTS, $state) {

      $rootScope.$on(EVENTS.API.REFRESH_START, function () {
        console.log('Dashboard refresh start');
      });

      $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
        console.log('Dashboard refresh success');
      });

      $scope.state = function (state) {
        return $state.is(state);
      };

      Dashboard.initialLoad();

    }]);