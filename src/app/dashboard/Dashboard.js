'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory('Dashboard', function () {
    var dashboard = {};
    
    dashboard.getClassrooms = function () {
      return this.data.classrooms;
    };
    dashboard.getCourseEvents = function () {
      return this.data.courseEvents;
    };
    dashboard.getGlobalEvents = function () {
      return this.data.globalEvents;
    };
    dashboard.getGroupEventss = function () {
      return this.data.groupEvents;
    };
    dashboard.getGroups = function () {
      return this.data.groups;
    };
    dashboard.getTeachers = function () {
      return this.data.teachers;
    };
    

    return dashboard;
  })
  .run(['$rootScope', '$timeout', 'Api', 'Dashboard', 'API_REFRESH_TIMEOUT', 'EVENTS',
    function ($rootScope, $timeout, Api, Dashboard, API_REFRESH_TIMEOUT, EVENTS) {
      var refresh = function () {
        $rootScope.$broadcast(EVENTS.API.REFRESH_START);
        Api.fetchDashboardData().then(function (response) {
          if (response.success) {
            Dashboard.data = response.success.data;
            $rootScope.$broadcast(EVENTS.API.REFRESH_SUCCESS, Dashboard.data);
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