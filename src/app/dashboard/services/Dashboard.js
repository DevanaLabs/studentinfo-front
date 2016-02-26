'use strict';

angular.module('siApp.dashboard')
  .factory('Dashboard', ['$rootScope', '$timeout', 'localStorageService', 'Api', 'EVENTS', 'API_REFRESH_TIMEOUT',
    function ($rootScope, $timeout, localStorageService, Api, EVENTS, API_REFRESH_TIMEOUT) {
      var data = {};
      var dashboard = {};

      dashboard.setData = function (newData) {
        data = newData;
        localStorageService.set('dashboard-data', data);
      };

      dashboard.loadFromCache = function () {
        if (localStorageService.get('dashboard-data')) {
          dashboard.setData(localStorageService.get('dashboard-data'));
        }
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
          $rootScope.$broadcast(EVENTS.API.REFRESH_START);
          Api.fetchDashboardData().then(function (response) {
            if (response.data.success) {
              dashboard.setData(response.data.success.data);
              $rootScope.$broadcast(EVENTS.API.REFRESH_SUCCESS);
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
  .run(['Dashboard', function (Dashboard) {
    Dashboard.loadFromCache();
  }])
  .constant('API_REFRESH_TIMEOUT', 36000000); // 10 minutes