'use strict';

angular.module('siApp')
  .controller('LectureNotificationCtrl', ['$scope', '$state', '$stateParams', 'toastr', 'LectureNotifications',
    'DateTimeConverter', 'Mode', 'EVENTS',
    function ($scope, $state, $stateParams, toastr, LectureNotifications, DateTimeConverter, Mode, EVENTS) {

      $scope.canSubmit = true;
      $scope.notification = null;

      $scope.mode = Mode;

      $scope.onSubmit = function () {
        if (!LectureNotifications.validate($scope.notification)) {
          toastr.error('Podaci nisu validni, molimo pokusajte ponovo');
          return;
        }

        LectureNotifications.save($scope.notification).then(function (response) {
          if (response.data.success) {
            toastr.success('Sacuvano');
            $state.go('admin.notifications', {
              type: 'lectures',
              relatedEntityId: $stateParams.relatedEntityId
            });
          }
        }, function () {
          toastr.error('Greska!');
        });
      };

      if (Mode === 'UPDATE') {
        LectureNotifications.get($stateParams.id)
          .then(function (response) {
            if (response.data.success) {
              // console.log(response.data.success);
              $scope.notification = response.data.success.data.notification;
            }
          }, function () {
            toastr.error('Greska pri ucitavanju obavestenja!');
          }).finally(function () {
            $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
          });
      } else {
        $scope.notification = {};
        LectureNotifications.getRelatedLecture($stateParams.relatedEntityId).then(function (response) {
          if (response.data.success) {
            $scope.notification.lecture = response.data.success.data.lecture;
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