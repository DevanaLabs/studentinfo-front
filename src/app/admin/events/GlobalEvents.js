'use strict';

angular.module('siApp')
  .factory('GlobalEvents', ['Api',
    function (Api) {
      var globalEvents = {};

      globalEvents.validate = function (event) {
        return true;
      };

      globalEvents.get = function (id) {
        return Api.getGlobalEvent(id);
      };

      globalEvents.getAll = function (pagination) {
        return Api.getGlobalEvents(pagination);
      };

      globalEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      return globalEvents;
    }]);