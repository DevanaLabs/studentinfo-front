'use strict';

angular.module('siAdminApp')

  .controller('NewEventNotificationCtrl', [
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

      $scope.save = function onSubmit () {
        var notificationObject = new NotificationService.eventNotification();
        notificationObject.eventId = $stateParams.event;
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