'use strict';

angular.module('siApp')
  .factory('DateTimeConverter', [function () {
    var dateTimeConverter = {
      fromServerFormat: 'YYYY-MM-DDTHH:mm:ss+0000',
      toServerFormat: 'YYYY-MM-DD HH:mm'
    };

    dateTimeConverter.toMoment = function (rawDatetime) {
      return moment(rawDatetime);
    };

    dateTimeConverter.fromMoment = function (momentDatetime) {
      return momentDatetime.format();
    };

    dateTimeConverter.separateDateAndTime = function (rawDatetime) {
      return {
        raw: rawDatetime,
        date: moment(rawDatetime).toDate(),
        time: moment(rawDatetime).toDate()
      };
    };

    dateTimeConverter.combineDateAndTime = function (datetime) {
      var momentTime = moment(datetime.time);
      return moment(datetime.date)
        .minute(momentTime.minute())
        .hour(momentTime.hour())
        .format(dateTimeConverter.toServerFormat);
    };

    dateTimeConverter.fromBeginningOfTheWeek = function (offset) {
      return moment().startOf('isoweek').add(offset, 'seconds');
    };

    dateTimeConverter.fromBeginningOfTheWeekSeparated = function (offset) {
      var momentDate = dateTimeConverter.fromBeginningOfTheWeek(offset);
      return {
        day: momentDate.weekday(),
        time: moment().startOf('isoweek').add(offset, 'seconds').toDate()
      };
    };

    dateTimeConverter.toBeginningOfTheWeek = function (data) {
      data.time = moment(data.time);
      return moment().startOf('isoweek').weekday(data.day).hour(data.time.hours())
          .minute(data.time.minutes()).unix() - moment().startOf('isoweek').unix();
    };

    dateTimeConverter.compareDates = function(date1, date2) {
      return (date1.year() == date2.year() && date1.month() == date2.month() && date1.date() == date2.date());
    };

    return dateTimeConverter;
  }]);