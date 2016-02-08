'use strict';


angular.module('siApp')
  .factory('Professors', ['$rootScope', 'Api', function ($rootScope, Api) {
    var professors = {};

    professors.getAll = function (pagination) {
      return Api.getProfessors(pagination);
    };

    return professors;
  }]);