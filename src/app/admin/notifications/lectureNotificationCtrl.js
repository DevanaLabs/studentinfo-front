'use strict';

angular.module('siApp')
  .controller('LectureNotificationCtrl', ['$scope', '$state', '$stateParams', 'Error', 'LectureNotifications',
    'DateTimeConverter', 'Mode', 'EVENTS',
    function ($scope, $state, $stateParams, Error, LectureNotifications, DateTimeConverter, Mode, EVENTS) {

      $scope.canSubmit = true;
      $scope.notification = null;

      $scope.mode = Mode;

      $scope.onSubmit = function () {
        if (!LectureNotifications.validate($scope.notification)) {
          Error.error('INVALID_INPUT_DATA');
          return;
        }

        LectureNotifications.save($scope.notification).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
            $state.go('admin.notifications', {
              type: 'lectures',
              relatedEntityId: $stateParams.relatedEntityId
            });
          }
        }, function (response) {
          Error.httpError(response);
        });
      };

      if (Mode === 'UPDATE') {
        LectureNotifications.get($stateParams.id)
          .then(function (response) {
            if (response.data.success) {
              $scope.notification = response.data.success.data.notification;
            }
          }, function (response) {
            Error.httpError(response);
          }).finally(function () {
            $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
          });
      } else {
        $scope.notification = {};
        LectureNotifications.getRelatedLecture($stateParams.relatedEntityId).then(function (response) {
          if (response.data.success) {
            $scope.notification.lecture = response.data.success.data.lecture;
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