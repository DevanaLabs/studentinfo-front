'use strict';

angular.module('siApp')
  .factory('GroupEvents', ['$q', 'Api', 'DateTimeConverter', 'CommonEvent',
    function ($q, Api, DateTimeConverter, CommonEvent) {
      var groupEvents = {};

      groupEvents.validate = function (event) {
        return true;
      };

      groupEvents.get = function (id) {
        var deferred = $q.defer();

        Api.getGroupEvent(id).then(function (response) {
          CommonEvent.transformIncomingEvent(response.data.success.data.event);
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      groupEvents.save = function (event) {
        CommonEvent.transformOutgoingEvent(event);
        if (event.id) {
          return Api.saveGroupEvent(event);
        }
        return Api.makeNewGroupEvent(event);
      };

      groupEvents.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        var deferred = $q.defer();

        Api.getGroupEvents(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (e) {
            CommonEvent.attachRequiredProps(e);
          });
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      groupEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      groupEvents.getRelatedEntities = function () {
        return Api.getGroups();
      };

      return groupEvents;
    }]);