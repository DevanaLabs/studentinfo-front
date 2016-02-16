'use strict';

angular.module('siApp')
  .controller('EventCtrl', ['$scope', '$state', '$stateParams', 'toastr', 'Event', 'DateTimeConverter', 'Mode',
    function ($scope, $state, $stateParams, toastr, Event, DateTimeConverter, Mode) {

      $scope.canSubmit = true;
      $scope.event = null;

      $scope.mode = Mode;
      $scope.relatedEntities = [];

      $scope.eventsType = Event.eventsType;

      if (Event.eventsType.slug !== 'global' && Mode === 'CREATE') {
        Event.getRelatedEntities().then(function (response) {
          if (response.data.success) {
            console.log(_.values(response.data.success));
            $scope.relatedEntities = response.data.success.data;
          }
        }, function (response) {

        });
      }

      $scope.onSubmit = function () {
        if (!Event.validate($scope.event)) {
          toastr.error('Podaci nisu validni, molimo pokusajte ponovo');
          return;
        }
        Event.save($scope.event).then(function (response) {
          if (response.data.success) {
            toastr.success('Sacuvano');
            $state.go('admin.events', {
              type: Event.eventsType.slug
            });
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
              $scope.event.relatedEntity = $scope.event[Event.eventsType.slug].id;
              $scope.event.relatedEntityName = $scope.event[Event.eventsType.slug].name;
            }
          }, function (response) {
            toastr.error('Greska pri ucitavanju dogadjaja');
          });
      } else {
        $scope.event = {
          relatedEntity: -1
        };
      }

      $scope.datePickersStatus = {
        startsAt: {
          opened: false
        },
        endsAt: {
          opened: false
        }
      };

      $scope.openStartsAt = function ($event) {
        $scope.datePickersStatus.startsAt.opened = true;
      };

      $scope.openEndsAt = function ($event) {
        $scope.datePickersStatus.endsAt.opened = true;
      };

    }]);