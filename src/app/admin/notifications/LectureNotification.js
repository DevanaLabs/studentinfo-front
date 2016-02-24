'use strict';

angular.module('siApp')
  .factory('LectureNotifications', ['$q', 'Api', 'DateTimeConverter', 'Lectures', 'CommonNotification',
    function ($q, Api, DateTimeConverter, Lectures, CommonNotification) {
      var lectureNotifications = {};

      var transformIncomingLectureNotification = function (notification) {
        notification = CommonNotification.transformIncomingNotification(notification);
        notification = CommonNotification.attachRequiredProps(notification);
        return notification;
      };

      lectureNotifications.validate = function (notification) {
        return true;
      };

      lectureNotifications.save = function (notification) {
        notification = CommonNotification.transformOutgoingNotification(notification);
        if (notification.id) {
          return Api.saveLectureNotification(notification);
        }
        return Api.makeNewLectureNotification(notification);
      };

      lectureNotifications.get = function (id) {
        var deferred = $q.defer();

        Api.getLectureNotification(id).then(function (response) {
          response.data.success.data.notification =
            transformIncomingLectureNotification(response.data.success.data.notification);
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      lectureNotifications.getAll = function (pagination) {
        var deferred = $q.defer();

        Api.getLectureNotifications(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (n) {
            n = transformIncomingLectureNotification(n);
          });
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      lectureNotifications.remove = function (id) {
        return Api.removeLectureNotification(id);
      };

      lectureNotifications.getRelatedLecture = function (id) {
        return Lectures.get(id);
      };

      lectureNotifications.getAllForRelatedEntity = function (id) {
        var deferred = $q.defer();

        Api.getLectureNotifications(id).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (n) {
            n = transformIncomingLectureNotification(n);
          });
          deferred.resolve(response);
        }, function () {
          deferred.reject();
        });

        return deferred.promise;
      };

      return lectureNotifications;
    }]);