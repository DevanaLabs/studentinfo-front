'use strict';

angular.module('siApp')
  .controller('EventNotificationCtrl', ['$scope', '$state', '$stateParams', 'toastr', 'EventNotifications',
    'DateTimeConverter', 'Mode', 'EVENTS',
    function ($scope, $state, $stateParams, toastr, EventNotifications, DateTimeConverter, Mode, EVENTS) {

      $scope.canSubmit = true;
      $scope.notification = null;

      $scope.mode = Mode;

      $scope.onSubmit = function () {
        if (!EventNotifications.validate($scope.notification)) {
          toastr.error('Podaci nisu validni, molimo pokusajte ponovo');
          return;
        }

        EventNotifications.save($scope.notification).then(function (response) {
          if (response.data.success) {
            toastr.success('Sacuvano');
            $state.go('admin.notifications', {
              type: 'events',
              relatedEntityId: $stateParams.relatedEntityId
            });
          }
        }, function () {
          toastr.error('Greska!');
        });
      };

      if (Mode === 'UPDATE') {
        EventNotifications.get($stateParams.id)
          .then(function (response) {
            if (response.data.success) {
              $scope.notification = response.data.success.data.notification;
            }
          }, function () {
            toastr.error('Greska pri ucitavanju obavestenja!');
          }).finally(function () {
            $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
          });
      } else {
        $scope.notification = {};
        EventNotifications.getRelatedEvent($stateParams.relatedEntityId).then(function (response) {
          if (response.data.success) {
            $scope.notification.event = response.data.success.data.event;
          }
        }, function () {
          toastr.error('Greska!');
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      }

      $scope.datePickersStatus = {
        expiresAt: {
          opened: false
        }
      };

      $scope.openExpiresAt = function ($event) {
        $scope.datePickersStatus.expiresAt.opened = true;
      };

    }]);