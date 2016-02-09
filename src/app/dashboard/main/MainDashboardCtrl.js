'use strict';

angular.module('siApp.dashboard')
  .controller('MainDashboardCtrl', ['$rootScope', 'Dashboard', 'EVENTS',
    function ($rootScope, Dashboard, EVENTS) {

      $rootScope.$on(EVENTS.API.REFRESH_START, function () {
        console.log('Dashboard refresh start');
      });

      $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
        console.log('Dashboard refresh success');
      });

      Dashboard.initialLoad();

    }]);