'use strict';

angular.module('siApp')
  .factory('Professors', ['Api',
    function (Api) {
      var professors = {};

      professors.get = function (id) {
        return Api.getProfessor(id);
      };

      professors.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        return Api.getProfessors(pagination);
      };

      professors.remove = function (id) {
        return Api.removeProfessor(id);
      };

      professors.save = function (professor) {
        if (professor.id) {
          return Api.saveProfessor(professor);
        }
        return Api.makeNewProfessor(professor);
      };

      return professors;
    }]);