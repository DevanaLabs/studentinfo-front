'use strict';

angular.module('siApp.dashboard')
  .factory('Dashboard', ['$rootScope', '$timeout', 'Api', 'EVENTS', 'API_REFRESH_TIMEOUT',
    function ($rootScope, $timeout, Api, EVENTS, API_REFRESH_TIMEOUT) {
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

    dashboard.getGroupEvents = function () {
      return data.groupEvents;
    };

    dashboard.getGroups = function () {
      return data.groups;
    };

    dashboard.getTeachers = function () {
      return data.teachers;
    };

    dashboard.initialLoad = function () {
      console.log('Initial load');

      var refresh = function () {
        console.log("ref");
        $rootScope.$broadcast(EVENTS.API.REFRESH_START);
        Api.fetchDashboardData().then(function (response) {
          if (response.success) {
            dashboard.setData(response.success.data);
            $rootScope.$broadcast(EVENTS.API.REFRESH_SUCCESS);
            console.log('Done initial load');
          }
        }, function (response) {
          $rootScope.$broadcast(EVENTS.API.REFRESH_ERROR, response);
        });

        $timeout(function () {
          refresh();
        }, API_REFRESH_TIMEOUT);
      };

      refresh();
    };

    return dashboard;
  }])
  .constant('API_REFRESH_TIMEOUT', 30000);