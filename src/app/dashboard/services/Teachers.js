'use strict';

angular.module('siApp.dashboard')
  .factory('Teachers', ['$rootScope', 'Dashboard', 'LANGUAGE_CONSTANTS', 'EVENTS',
    function ($rootScope, Dashboard, LANGUAGE_CONSTANTS, EVENTS) {
      var teachersService = {};

      var teachers = Dashboard.getTeachers();

      $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
        teachers = Dashboard.getTeachers();
      });

      teachers.sort(function (a, b) {
        return (new Intl.Collator('rs').compare(a.lastName, b.lastName));
      });

      teachersService.getById = function (id) {
        return _.find(teachers, {'id': id*1});
      };

      teachersService.getShown = function () {
        return _.groupBy(teachers, function (teacher) {
          return teacher.lastName[0];
        });
      };

      teachersService.getFilters = function () {
        var allTeachers = _.groupBy(teachers, function (teacher) {
          return teacher.lastName[0];
        });
        var azbuka = LANGUAGE_CONSTANTS.CYRILIC;
        return _.zipObject(azbuka, _.map(azbuka, function (o) {
          return allTeachers.hasOwnProperty(o);
        }));
      };

      return teachersService;
    }]);