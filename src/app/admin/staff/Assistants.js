'use strict';

angular.module('siApp')
  .factory('Assistants', ['Api',
    function (Api) {
      var assistants = {};

      assistants.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        return Api.getAssistants(pagination);
      };

      assistants.remove = function (id) {
        return Api.removeAssistant(id);
      };

      return assistants;
    }]);