'use strict';

angular.module('siApp')
  .factory('Courses', ['Api',
    function (Api) {
      var courses = {};

      courses.getAll = function () {
        return Api.getCourses();
      };

      return courses;
    }]);