'use strict';

angular.module('siApp')
  .factory('GlobalEvents', ['$q', 'Api', 'DateTimeConverter', 'CommonEvent',
    function ($q, Api, DateTimeConverter, CommonEvent) {
      var globalEvents = {};

      globalEvents.validate = function (event) {
        return true;
      };

      globalEvents.save = function (event) {
        event = CommonEvent.transformOutgoingEvent(event);
        if (event.id) {
          return Api.saveGlobalEvent(event);
        }
        return Api.makeNewGlobalEvent(event);
      };

      globalEvents.get = function (id) {
        var deferred = $q.defer();

        Api.getGlobalEvent(id).then(function (response) {
          response.data.success.data.event = CommonEvent.transformIncomingEvent(response.data.success.data.event);
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      globalEvents.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        var deferred = $q.defer();

        Api.getGlobalEvents(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (e) {
            e = CommonEvent.attachRequiredProps(e);
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