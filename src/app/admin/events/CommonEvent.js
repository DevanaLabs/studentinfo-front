'use strict';

angular.module('siApp')
  .factory('CommonEvent', ['DateTimeConverter',
    function (DateTimeConverter) {
      var commonEvent = {};

      commonEvent.transformIncomingEvent = function (event) {
        event.startsAt = DateTimeConverter.separateDateAndTime(event.datetime.startsAt);
        event.endsAt = DateTimeConverter.separateDateAndTime(event.datetime.endsAt);
      };

      commonEvent.transformOutgoingEvent = function (event) {
        event.startsAt = DateTimeConverter.combineDateAndTime(event.startsAt);
        event.endsAt = DateTimeConverter.combineDateAndTime(event.endsAt);
      };

      commonEvent.attachRequiredProps = function (event) {
        event.momentTime = {
          startsAt: DateTimeConverter.toMoment(event.datetime.startsAt),
          endsAt: DateTimeConverter.toMoment(event.datetime.endsAt)
        };
        event.expired = moment().isAfter(event.momentTime.endsAt);
      };

      return commonEvent;
    }]);