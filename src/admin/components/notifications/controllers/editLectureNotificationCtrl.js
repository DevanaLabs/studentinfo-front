'use strict';

angular.module('siAdminApp')

  .controller('EditLectureNotificationCtrl', [
    '$scope',
    'NotificationService',
    'LectureService',
    '$stateParams',
    '$state',
    'DateTimeProcessService',
    'toastr',
    function ($scope,
              NotificationService,
              LectureService,
              $stateParams,
              $state,
              DateTimeProcessService,
              toastr) {

      var vm = this;
      vm.notification = {};

      var notif = NotificationService.lectureNotification.get({id: $stateParams.id}, function () {
        var notification = notif.success.data.notification;
        vm.notification = {
          id: notification.id,
          description: notification.description,
          expiresAt: DateTimeProcessService.convertFormats(notification.expiresAt)
        };
      });

      $scope.save = function onSubmit () {
        var notification = {
          lectureId: $stateParams.lecture,
          expiresAt: DateTimeProcessService.rollback(vm.notification.expiresAt),
          description: vm.notification.description
        };

        NotificationService.lectureNotification.update({id: notification.id}, notification, function (response) {
          $state.go('lectureNotifications');
          toastr.success('Obavestenje je sacuvano');
        }, function (response) {
          toastr.error('Obavestenje nije sacuvano');
        });
      };

      $scope.status = {
        expiresAt: {
          opened: false
        }
      };

      $scope.openExpiresAt = function ($notification) {
        $scope.status.expiresAt.opened = true;
      };
    }]);