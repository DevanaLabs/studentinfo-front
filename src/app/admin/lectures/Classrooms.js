'use strict';

angular.module('siApp')
  .factory('Classrooms', ['Api',
    function (Api) {
      var classrooms = {};

      classrooms.getAll = function () {
        return Api.getClassrooms();
      };
      return classrooms;
    }]);