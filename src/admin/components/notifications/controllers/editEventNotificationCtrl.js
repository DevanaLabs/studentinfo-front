'use strict';

angular.module('siAdminApp')

  .controller('EditEventNotificationCtrl', [
    '$scope',
    'NotificationService',
    'EventService',
    '$stateParams',
    '$state',
    'DateTimeProcessService',
    'toastr',
    function ($scope,
              NotificationService,
              EventService,
              $stateParams,
              $state,
              DateTimeProcessService,
              toastr) {

      var vm = this;

      vm.notification = {};

      var response = NotificationService.eventNotification.get({id: $stateParams.id}, function () {
        if (response.success) {
          vm.notification = response.success.data.notification;
          vm.notification.expiresAt = DateTimeProcessService.convertFormats(vm.notification.expiresAt);
        } else {
          toastr.error('Greska');
        }
      });

      $scope.save = function onSubmit () {
        var notificationObject = new NotificationService.eventNotification();
        notificationObject.expiresAt = DateTimeProcessService.rollback(vm.notification.expiresAt);
        notificationObject.description = vm.notification.description;

        console.log(notificationObject);
        notificationObject.$save(function (response) {
          $state.go('eventNotifications');
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