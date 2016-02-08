'use strict';

angular.module('siApp')
  .factory('Assistants', ['$rootScope', 'Api', function ($rootScope, Api) {
    var assistants = {};

    assistants.getAll = function (pagination) {
      return Api.getStudents(pagination);
    };

    return assistants;
  }]);