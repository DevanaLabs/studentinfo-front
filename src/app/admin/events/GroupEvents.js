'use strict';

angular.module('siApp')
  .factory('GroupEvents', ['Api',
    function (Api) {
      var groupEvents = {};

      groupEvents.validate = function (event) {
        return true;
      };

      groupEvents.get = function (id) {
        return Api.getGroupEvent(id);
      };

      groupEvents.getAll = function (pagination) {
        return Api.getGroupEvents(pagination);
      };

      groupEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      return groupEvents;
    }]);