'use strict';

angular.module('siApp')
  .factory('Students', ['Api',
    function (Api) {
      var students = {};

      students.get = function (id) {
        return Api.getStudent(id);
      };

      students.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        return Api.getStudents(pagination);
      };

      students.remove = function (id) {
        return Api.removeStudent(id);
      };

      students.save = function (student) {
        if (student.id) {
          return Api.saveStudent(student);
        }
        student.lectures = [];
        student.courses = [];
        return Api.makeNewStudent(student);
      };

      return students;
    }]);