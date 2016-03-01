'use strict';

angular.module('siApp')
  .factory('CommonNotification', ['DateTimeConverter',
    function (DateTimeConverter) {
      var commonNotification = {};

      commonNotification.transformIncomingNotification = function (notification) {
        notification.expiresAt =
          DateTimeConverter.separateDateAndTime(notification.expiresAt);
      };

      commonNotification.transformOutgoingNotification = function (notification) {
        notification.expiresAt = DateTimeConverter.combineDateAndTime(notification.expiresAt);
      };

      commonNotification.attachRequiredProps = function (notification) {
        notification.momentTime = {
          expiresAt: DateTimeConverter.toMoment(notification.expiresAt)
        };
        notification.expired = moment().isAfter(notification.momentTime.expiresAt);
      };

      return commonNotification;
    }]);