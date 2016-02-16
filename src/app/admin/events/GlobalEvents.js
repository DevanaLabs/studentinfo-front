'use strict';

angular.module('siApp')
  .factory('GlobalEvents', ['$q', 'Api', 'DateTimeConverter',
    function ($q, Api, DateTimeConverter) {
      var globalEvents = {};

      globalEvents.validate = function (event) {
        return true;
      };

      globalEvents.save = function (event) {
        event.startsAt = DateTimeConverter.combineDateAndTime(event.startsAt);
        event.endsAt = DateTimeConverter.combineDateAndTime(event.endsAt);
        if (event.id) {
          return Api.saveGlobalEvent(event);
        }
        return Api.makeNewGlobalEvent(event);
      };

      globalEvents.get = function (id) {
        // Primer kako bi se mogli resiti boilerplate koda za konverziju datuma u kontrolerima
        var deferred = $q.defer();

        Api.getGlobalEvent(id).then(function (response) {
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

      globalEvents.getAll = function (pagination) {
        var deferred = $q.defer();

        Api.getGlobalEvents(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (e) {
            e.momentTime = {
              startsAt: DateTimeConverter.toMoment(e.datetime.startsAt),
              endsAt: DateTimeConverter.toMoment(e.datetime.endsAt)
            };
            e.expired = moment().isAfter(e.momentTime.endsAt);
          });
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      globalEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      return globalEvents;
    }]);