'use strict';

angular.module('siApp')
  .factory('DateTimeConverter', [function () {
    var dateTimeConverter = {
      serverFormat: 'YYYY-MM-DDTHH:mm:ss+0000'
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
        .format(dateTimeConverter.serverFormat);
    };

    return dateTimeConverter;
  }]);