'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory('Dashboard', function () {
    var data = {};
    var dashboard = {};

    dashboard.setData = function (newData) {
      data = newData;
    };

    dashboard.getClassrooms = function () {
      return data.classrooms;
    };

    dashboard.getCourseEvents = function () {
      return data.courseEvents;
    };

    dashboard.getGlobalEvents = function () {
      return data.globalEvents;
    };

    dashboard.getGroupEventss = function () {
      return data.groupEvents;
    };

    dashboard.getGroups = function () {
      return data.groups;
    };

    dashboard.getTeachers = function () {
      return data.teachers;
    };

    return dashboard;
  })
  .run(['$rootScope', '$timeout', 'Api', 'Dashboard', 'API_REFRESH_TIMEOUT', 'EVENTS',
    function ($rootScope, $timeout, Api, Dashboard, API_REFRESH_TIMEOUT, EVENTS) {
      var refresh = function () {
        $rootScope.$broadcast(EVENTS.API.REFRESH_START);
        Api.fetchDashboardData().then(function (response) {
          if (response.success) {
            Dashboard.setData(response.success.data);
            $rootScope.$broadcast(EVENTS.API.REFRESH_SUCCESS);
          }
        }, function (response) {
          $rootScope.$broadcast(EVENTS.API.REFRESH_ERROR, response);
        });
      };

      $timeout(function () {
        refresh();
      }, API_REFRESH_TIMEOUT);

      refresh();
    }])
  .constant('API_REFRESH_TIMEOUT', 30000);