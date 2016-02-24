'use strict';

angular.module('siApp')
  .factory('Assistants', ['Api',
    function (Api) {
      var assistants = {};

      assistants.get = function (id) {
        return Api.getAssistant(id);
      };

      assistants.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        return Api.getAssistants(pagination);
      };

      assistants.remove = function (id) {
        return Api.removeAssistant(id);
      };

      assistants.save = function (assistant) {
        if (assistant.id) {
          return Api.saveAssistant(assistant);
        }
        return Api.makeNewAssistant(assistant);
      };

      return assistants;
    }]);