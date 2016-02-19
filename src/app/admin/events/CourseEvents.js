'use strict';

angular.module('siApp')
  .factory('CourseEvents', ['$q', 'Api', 'DateTimeConverter', 'CommonEvent',
    function ($q, Api, DateTimeConverter, CommonEvent) {
      var courseEvents = {};

      courseEvents.validate = function (event) {
        return true;
      };

      courseEvents.get = function (id) {
        var deferred = $q.defer();

        Api.getCourseEvent(id).then(function (response) {
          response.data.success.data.event = CommonEvent.transformIncomingEvent(response.data.success.data.event);
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      courseEvents.save = function (event) {
        event = CommonEvent.transformOutgoingEvent(event);
        if (event.id) {
          return Api.saveCourseEvent(event);
        }
        return Api.makeNewCourseEvent(event);
      };

      courseEvents.getAll = function (pagination) {
        if (pagination === undefined) {
          pagination = {};
        }
        var deferred = $q.defer();

        Api.getCourseEvents(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (e) {
            e = CommonEvent.attachRequiredProps(e);
          });
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      courseEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      courseEvents.getRelatedEntities = function () {
        return Api.getCourses();
      };

      return courseEvents;
    }]);