'use strict';

angular.module('siApp')
  .controller('EventNotificationCtrl', ['$scope', '$state', '$stateParams', 'Error', 'EventNotifications',
    'DateTimeConverter', 'Mode', 'EVENTS',
    function ($scope, $state, $stateParams, Error, EventNotifications, DateTimeConverter, Mode, EVENTS) {

      $scope.canSubmit = true;
      $scope.notification = null;

      $scope.mode = Mode;

      $scope.onSubmit = function () {
        if (!EventNotifications.validate($scope.notification)) {
          Error.error('INVALID_INPUT_DATA');
          return;
        }

        EventNotifications.save($scope.notification).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
            $state.go('admin.notifications', {
              type: 'events',
              relatedEntityId: $stateParams.relatedEntityId
            });
          }
        }, function (response) {
          Error.httpError(response);
        });
      };

      if (Mode === 'UPDATE') {
        EventNotifications.get($stateParams.id)
          .then(function (response) {
            if (response.data.success) {
              $scope.notification = response.data.success.data.notification;
            }
          }, function (response) {
            Error.error(response);
          }).finally(function () {
            $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
          });
      } else {
        $scope.notification = {};
        EventNotifications.getRelatedEvent($stateParams.relatedEntityId).then(function (response) {
          if (response.data.success) {
            $scope.notification.event = response.data.success.data.event;
          }
        }, function (response) {
          Error.httpError(response);
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