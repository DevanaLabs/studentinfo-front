'use strict';

angular.module('siApp')
  .factory('Assistants', ['$rootScope', 'Api', function ($rootScope, Api) {
    var assistants = {};

    assistants.getAll = function (pagination) {
      return Api.getAssistants(pagination);
    };

    assistants.remove = function (id) {
      return Api.removeAssistant(id);
    };

    return assistants;
  }]);