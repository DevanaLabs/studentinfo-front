'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory('Dashboard', function () {
    var dashboard = {};

    return dashboard;
  })
  .run(function ($rootScope, $timeout, Api, Dashboard, API_REFRESH_TIMEOUT, EVENTS) {
    var refresh = function () {
      Api.fetchDashboardData().then(function (response) {
        if (response.success) {
          Dashboard.data = response.success.data;
          $rootScope.$broadcast(EVENTS.api.refreshSuccess, Dashboard.data);
        }
      }, function (response) {
        $rootScope.$broadcast(EVENTS.api.refreshError, response);
      });
    };

    $timeout(function () {
      refresh();
    }, API_REFRESH_TIMEOUT);

    refresh();
  })
  .constant('API_REFRESH_TIMEOUT', 5000);