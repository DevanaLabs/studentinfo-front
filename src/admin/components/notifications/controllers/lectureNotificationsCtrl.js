'use strict';

angular.module('siAdminApp')
  .controller('LectureNotificationsCtrl', [
    '$scope',
    '$state',
    'NotificationService',
    'DateTimeProcessService',
    'toastr',
    function LectureNotificationsCtrl ($scope, $state, NotificationService, DateTimeProcessService, toastr) {
      var self = this;

      $scope.loadedAll = false;
      $scope.notifications = [];
      $scope.query = '';

      this.loadNotifications = function (start, count) {
        var response = NotificationService.lectureNotification.getAll({start: start, count: count}, function () {
          if (response.success) {
            console.log(response);
            if (response.success.data.length === 0) {
              toastr.info('Nema vise notifikacija');
              $scope.loadedAll = true;
              return;
            }
            $scope.notifications = response.success.data;
          } else {
            toastr.error('Greska prilikom ucitavanja notifikacija');
          }
        });
      };

      $scope.showMore = function () {
        var start = $scope.notifications.length;
        var count = 10;
        self.loadNotifications(start, count);
      };

      $scope.deleteNotification = function (id) {
        NotificationService.lectureNotification.remove({id: id}, function (response) {
          if (response.success) {
            toastr.success('Obavestenje je obrisano');
            _.remove($scope.notifications, function (notification) {
              return notification.id == id;
            });
          } else {
            toastr.error('Obavestenje je obrisano');
          }
        });
      };

      this.loadNotifications(0, 5);
    }]);