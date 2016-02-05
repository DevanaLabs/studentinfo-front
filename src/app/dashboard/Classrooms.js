'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory("Classrooms", ['$scope', 'Dashboard', function ($scope, Dashboard) {
    var classroomsService = {};

    var classrooms = Dashboard.getClassrooms();

    classroomsService.getById = function (id) {
      return _.find(classrooms, {'id': id});
    };
    classroomsService.getForFloor = function (floor) {
      return _.values(_.pickBy(classrooms, {"floor": floor}));
    };
    classroomsService.getFilters = function () {
      return _.uniq( _.map( classrooms, 'floor' ) );
    };


    return classroomsService;
  }]);