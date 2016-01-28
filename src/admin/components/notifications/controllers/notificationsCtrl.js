'use strict';

angular.module('siAdminApp')
  .controller('NotificationsCtrl', [
    '$scope',
    '$state',
    'NotificationService',
    'DateTimeProcessService',
    'toastr',
    function NotificationsCtrl ($scope, $state, NotificationService, DateTimeProcessService, toastr) {
      var self = this;

      $scope.loadedAll = false;
      $scope.notifications = {};
      $scope.query = '';

      this.loadNotifications = function (start, count) {

      };

      $scope.showMore = function () {
        var start = $scope.notifications.length;
        var count = 10;
        self.loadNotifications(start, count);
      };

      $scope.deleteNotification = function (id) {

      };

      this.loadNotifications(0, 5);
    }]);