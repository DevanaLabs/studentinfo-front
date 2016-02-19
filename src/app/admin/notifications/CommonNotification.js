'use strict';

angular.module('siApp')
  .factory('CommonNotification', ['DateTimeConverter',
    function (DateTimeConverter) {
      var commonNotification = {};

      commonNotification.transformIncomingNotification = function (notification) {
        notification.expiresAt =
          DateTimeConverter.separateDateAndTime(notification.expiresAt);
        return notification;
      };

      commonNotification.transformOutgoingNotification = function (notification) {
        notification.expiresAt = DateTimeConverter.combineDateAndTime(notification.expiresAt);
        return notification;
      };

      commonNotification.attachRequiredProps = function (notification) {
        notification.momentTime = {
          expiresAt: DateTimeConverter.toMoment(notification.expiresAt)
        };
        notification.expired = moment().isAfter(notification.momentTime.expiresAt);
        return notification;
      };

      return commonNotification;
    }]);