'use strict';

angular.module('siApp.dashboard')
  .factory('CourseEvents', ['$rootScope', 'Dashboard', 'EVENTS', function ($rootScope, Dashboard, EVENTS) {
    var courseEventsService = {};

    var courseEvents = Dashboard.getCourseEvents();

    $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      courseEvents = Dashboard.getCourseEvents();
    });

    courseEventsService.getAll = function () {
      return courseEvents;
    };

    courseEventsService.getForDay = function (day) {
      // Moment.js: http://momentjs.com/docs/#/parsing/object/
      day.month--;
      var date = moment(day);
      return _.values(_.pickBy(courseEvents, function (event) {
        return moment(event.datetime.startsAt, 'YYYY-MM-DD').isSame(date);
      }));
    };

    return courseEventsService;
  }]);