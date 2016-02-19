'use strict';

angular.module('siApp')
  .factory('Professors', ['Api',
    function (Api) {
      var professors = {};

      professors.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        return Api.getProfessors(pagination);
      };

      professors.remove = function (id) {
        return Api.removeProfessor(id);
      };

      return professors;
    }]);