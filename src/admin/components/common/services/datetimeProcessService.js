'use strict';

angular.module('siAdminApp')
  .service('DateTimeProcessService', function () {
    var self = this;

    this.process = function (event) {
      event.startsAt = self.convertFormats(event.datetime.startsAt);
      event.endsAt = self.convertFormats(event.datetime.endsAt);
      return event;
    }

    this.rollback = function (dateTime) {
      var timeStart = moment(dateTime.time);
      return moment(dateTime.date)
        .add(timeStart.minutes(), 'minutes')
        .add(timeStart.hours(), 'hours')
        .format('YYYY-MM-DD HH:mm');
    }

    this.convertFormats = function (dateTimeString) {
      var parts = dateTimeString.split('T');
      return {
        raw: dateTimeString,
        date: moment(parts[0]),
        time: moment(dateTimeString)
      };
    }
  });