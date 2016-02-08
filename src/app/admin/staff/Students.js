'use strict';


angular.module('siApp')
  .factory('Students', ['$rootScope', 'Api', function ($rootScope, Api) {
    var students = {};

    students.getAll = function (pagination) {
      return Api.getStudents(pagination);
    };

    students.remove = function (id) {
      return Api.removeStudent(id);
    };

    return students;
  }]);