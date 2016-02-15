'use strict';

angular.module('siApp')
  .factory('GroupEvents', ['$q', 'Api', 'DateTimeConverter',
    function ($q, Api, DateTimeConverter) {
      var groupEvents = {};

      groupEvents.validate = function (event) {
        return true;
      };

      groupEvents.get = function (id) {
        var deferred = $q.defer();

        Api.getGroupEvent(id).then(function (response) {
          response.data.success.data.event.startsAt =
            DateTimeConverter.separateDateAndTime(response.data.success.data.event.datetime.startsAt);
          response.data.success.data.event.endsAt =
            DateTimeConverter.separateDateAndTime(response.data.success.data.event.datetime.endsAt);

          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      groupEvents.save = function (event) {
        event.startsAt = DateTimeConverter.combineDateAndTime(event.startsAt);
        event.endsAt = DateTimeConverter.combineDateAndTime(event.endsAt);
        if (event.id) {
          return Api.saveGroupEvent(event);
        }
        return Api.makeNewGroupEvent(event);
      };

      groupEvents.getAll = function (pagination) {
        return Api.getGroupEvents(pagination);
      };

      groupEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      groupEvents.getRelatedEntities = function () {
        return Api.getGroups();
      };

      return groupEvents;
    }]);