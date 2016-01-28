'use strict';

angular.module('siAdminApp')
  .controller('EventNotificationsCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'NotificationService',
    'DateTimeProcessService',
    'toastr',
    'EventService',
    function ($scope, $state, $stateParams, NotificationService, DateTimeProcessService, toastr, EventService) {
      var self = this;

      $scope.loadedAll = false;
      $scope.notifications = [];
      $scope.query = '';
      $scope.eventOnly = false;
      $scope.event = null;

      this.loadNotifications = function (start, count) {
        if ($scope.eventOnly) {
          var response = NotificationService.eventNotification.getAllForEvent({eventId: $scope.event.id}, function () {
            self.processResponse(response);
          });
        } else {
          var response = NotificationService.eventNotification.getAll({start: start, count: count}, function () {
            console.log(response);
            self.processResponse(response);
          });
        }
      };

      this.processResponse = function (response) {
        console.log(response);
        if (response.success) {
          if (response.success.data.length === 0) {
            toastr.info('Nema vise notifikacija');
            $scope.loadedAll = true;
            return;
          }
          $scope.notifications = response.success.data;
        } else {
          toastr.error('Nema vise notifikacija');
        }
      }

      $scope.showMore = function () {
        var start = $scope.notifications.length;
        var count = 10;
        self.loadNotifications(start, count);
      };

      $scope.deleteNotification = function (id) {
        alert('Ko fol izbrisah');
      };

      if ($state.is('eventNotifications_event')) {
        var ev = EventService.generic.get({id: $stateParams.id}, function () {
          $scope.event = ev.success.data.event;
          self.loadNotifications();
        });
        $scope.eventOnly = true;
      } else {
        self.loadNotifications(0, 5);
      }
    }]);