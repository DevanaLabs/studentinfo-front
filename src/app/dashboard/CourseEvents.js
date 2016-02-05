'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory("CourseEvents", ['$scope', 'Dashboard', function ($scope, Dashboard) {
    var courseEventsService = {};

    var courseEvents = Dashboard.getCourseEvents();

    courseEventsService.getAll = function (id) {
      return courseEvents;
    };
    courseEventsService.getForDay = function (year, month, day) {
      return _.values(_.pickBy(courseEvents, function(o){
        return (
          o.datetime.startsAt.substr(0, 4) * 1 == year &&
          o.datetime.startsAt.substr(5, 2) * 1 == month &&
          o.datetime.startsAt.substr(8, 2) * 1 == day
        )
      }));
    };

    return courseEventsService;
  }]);