'use strict';

angular.module('siApp')
  .factory('Students', ['Api',
    function (Api) {
      var students = {};

      students.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        return Api.getStudents(pagination);
      };

      students.remove = function (id) {
        return Api.removeStudent(id);
      };

      return students;
    }]);