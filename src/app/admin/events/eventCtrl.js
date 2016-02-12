'use strict';

angular.module('siApp')
  .controller('EventCtrl', ['$scope', '$state', '$stateParams', 'toastr', 'Event', 'DateTimeConverter', 'Mode',
    function ($scope, $state, $stateParams, toastr, Event, DateTimeConverter, Mode) {

      $scope.canSubmit = true;
      $scope.event = null;

      $scope.onSubmit = function () {
        $scope.event.startsAt = DateTimeConverter.combineDateAndTime($scope.event.startsAt);
        $scope.event.endsAt = DateTimeConverter.combineDateAndTime($scope.event.endsAt);
        Event.save($scope.event).then(function (response) {
          if (response.data.success) {
            toastr.success('Sacuvano');
            $state.go('admin.events');
          }
        }, function () {
          toastr.error('Greska!');
        });
      };

      if (Mode === 'UPDATE') {
        Event.get($stateParams.id)
          .then(function (response) {
            if (response.data.success) {
              $scope.event = response.data.success.data.event;
              $scope.event.startsAt = DateTimeConverter.separateDateAndTime($scope.event.datetime.startsAt);
              $scope.event.endsAt = DateTimeConverter.separateDateAndTime($scope.event.datetime.endsAt);
              console.log($scope.event);
            }
          }, function (response) {
            toastr.error('Greska pri ucitavanju dogadjaja');
          });
      }

      $scope.status = {
        startsAt: {
          opened: false
        },
        endsAt: {
          opened: false
        }
      };

      $scope.openStartsAt = function ($event) {
        $scope.status.startsAt.opened = true;
      };

      $scope.openEndsAt = function ($event) {
        $scope.status.endsAt.opened = true;
      };

    }]);