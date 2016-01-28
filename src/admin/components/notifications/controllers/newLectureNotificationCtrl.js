'use strict';

angular.module('siAdminApp')

  .controller('NewLectureNotificationCtrl', [
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

      $scope.save = function onSubmit () {
        var notificationObject = null;

        notificationObject = new NotificationService.lectureNotification();
        notificationObject.lectureId = $stateParams.lecture;

        notificationObject.expiresAt = DateTimeProcessService.rollback(vm.notification.expiresAt);
        notificationObject.description = vm.notification.description;

        notificationObject.$save(function (response) {
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