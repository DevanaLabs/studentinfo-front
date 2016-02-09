'use strict';

angular.module('siApp.dashboard')
  .factory('GlobalEvents', ['$rootScope', 'Dashboard', 'EVENTS', function ($rootScope, Dashboard, EVENTS) {
    var globalEventsService = {};

    var globalEvents = Dashboard.getGlobalEvents();

    $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      globalEvents = Dashboard.getGlobalEvents();
    });

    globalEventsService.getAll = function () {
      return globalEvents;
    };

    globalEventsService.getForDay = function (day) {
      day.month--;
      var date = moment(day);
      var events = _.values(_.pickBy(globalEvents, function (event) {
        var start = moment(event.datetime.startsAt, 'YYYY-MM-DD');
        var end = moment(event.datetime.endsAt, 'YYYY-MM-DD');
        return date.isAfter(start.subtract(1, 'days')) && date.isBefore(end);
      }));

      var type = null;
      if (events.length > 1) {
        type = 'multi';
      }
      else if (events.length > 0) {
        type = events[0].type;
      }
      // type is used for coloring the day on calendars
      return {
        events: events,
        type: type
      };
    };

    return globalEventsService;
  }]);