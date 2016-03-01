'use strict';

angular.module('siApp')
  .factory('EventNotifications', ['$q', 'Api', 'DateTimeConverter', 'CommonNotification',
    function ($q, Api, DateTimeConverter, CommonNotification) {
      var eventNotifications = {};

      eventNotifications.validate = function (notification) {
        return true;
      };

      eventNotifications.save = function (notification) {
        CommonNotification.transformOutgoingNotification(notification);
        if (notification.id) {
          return Api.saveEventNotification(notification);
        }
        return Api.makeNewEventNotification(notification);
      };

      eventNotifications.get = function (id) {
        var deferred = $q.defer();

        Api.getEventNotification(id).then(function (response) {
          CommonNotification.transformIncomingNotification(response.data.success.data.notification);
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      eventNotifications.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        var deferred = $q.defer();

        Api.getEventNotifications(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (n) {
            CommonNotification.attachRequiredProps(n);
          });
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      eventNotifications.getAllForRelatedEntity = function (eventId, pagination) {
        var deferred = $q.defer();

        Api.getEventNotificationsForEvent(eventId, pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (n) {
            CommonNotification.attachRequiredProps(n);
          });
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      eventNotifications.getRelatedEvent = function (id) {
        return Api.getEvent(id);
      };

      eventNotifications.remove = function (id) {
        return Api.removeNotification(id);
      };

      return eventNotifications;
    }]);