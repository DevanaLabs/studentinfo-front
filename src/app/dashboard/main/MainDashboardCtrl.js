'use strict';

angular.module('siApp.dashboard')
  .controller('MainDashboardCtrl', ['$rootScope', 'Dashboard', 'EVENTS',
    function ($rootScope, Dashboard, EVENTS) {

      $rootScope.$on(EVENTS.API.REFRESH_START, function () {
      });

      $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      });

      Dashboard.initialLoad();

    }]);