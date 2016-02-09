'use strict';

angular.module('siApp.dashboard')
  .factory('Classrooms', ['$rootScope', 'Dashboard', 'EVENTS', function ($rootScope, Dashboard, EVENTS) {
    var classroomsService = {};

    var classrooms = Dashboard.getClassrooms();

    $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      classrooms = Dashboard.getClassrooms();
    });

    classroomsService.getById = function (id) {
      return _.find(classrooms, {'id': id});
    };

    classroomsService.getForFloor = function (floor) {
      return _.values(_.pickBy(classrooms, {'floor': floor}));
    };

    classroomsService.getFilters = function () {
      return _.uniq(_.map(classrooms, 'floor'));
    };

    return classroomsService;
  }]);