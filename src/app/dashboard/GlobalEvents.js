'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory("GlobalEvents", ['$scope', 'Dashboard', function ($scope, Dashboard) {
    var globalEventsService = {};

    var globalEvents = Dashboard.getGlobalEvents();

    globalEventsService.getAll = function (id) {
      return globalEvents;
    };
    globalEventsService.getForDay = function (year, month, day) {
      var inputdate = new Date(year + "-" + month + "-" + day);
      var events = _.values(_.pickBy(globalEvents, function(o){
        var startdate = new Date(o.datetime.startsAt);
        var enddate = new Date(o.datetime.endsAt);
        return (inputdate.getTime() + 14400000 >= startdate && inputdate <= enddate)
      }));
      var type = (events.length > 1) ? "multi" : events[0].type;
      // type is used for coloring the day on calendars
      return {
        events: events,
        type: type
      };
    };

    return globalEventsService;
  }]);