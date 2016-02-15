'use strict';

angular.module('siApp')
  .factory('CourseEvents', ['$q', 'Api', 'DateTimeConverter',
    function ($q, Api, DateTimeConverter) {
      var courseEvents = {};

      courseEvents.validate = function (event) {
        return true;
      };

      courseEvents.get = function (id) {
        var deferred = $q.defer();

        Api.getCourseEvent(id).then(function (response) {
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

      courseEvents.save = function (event) {
        event.startsAt = DateTimeConverter.combineDateAndTime(event.startsAt);
        event.endsAt = DateTimeConverter.combineDateAndTime(event.endsAt);
        if (event.id) {
          return Api.saveCourseEvent(event);
        }
        return Api.makeNewCourseEvent(event);
      };

      courseEvents.getAll = function (pagination) {
        return Api.getCourseEvents(pagination);
      };

      courseEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      courseEvents.getRelatedEntities = function () {
        return Api.getCourses();
      };

      return courseEvents;
    }]);