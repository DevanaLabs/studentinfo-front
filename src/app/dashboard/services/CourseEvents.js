'use strict';

angular.module('siApp.dashboard')
  .factory('CourseEventsD', ['$rootScope', 'Dashboard', 'EVENTS', 'DateTimeConverter', 
    function ($rootScope, Dashboard, EVENTS, DateTimeConverter) {
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
      var events = _.values(_.pickBy(courseEvents, function (event) {
        return DateTimeConverter.compareDates(day, moment(event.datetime.startsAt, 'YYYY-MM-DD'));
      }));
      events.sort(function(a,b){
        return a.datetime.startsAt.substr(11, 2)*1 - b.datetime.startsAt.substr(11, 2)*1;
      });
      return events;
    };

    return courseEventsService;
  }]);