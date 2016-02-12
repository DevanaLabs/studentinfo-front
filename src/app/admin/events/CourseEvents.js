'use strict';

angular.module('siApp')
  .factory('CourseEvents', ['Api',
    function (Api) {
      var courseEvents = {};

      courseEvents.validate = function (event) {
        return true;
      };

      courseEvents.get = function (id) {
        return Api.getCourseEvent(id);
      };

      courseEvents.getAll = function (pagination) {
        return Api.getCourseEvents(pagination);
      };

      courseEvents.remove = function (id) {
        return Api.removeEvent(id);
      };

      return courseEvents;
    }]);