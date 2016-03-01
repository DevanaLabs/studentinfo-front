'use strict';

angular.module('siApp')
  .controller('EventCtrl', ['$scope', '$state', '$stateParams', 'Error', 'Event', 'Mode', 'EVENTS',
    function ($scope, $state, $stateParams, Error, Event, Mode, EVENTS) {
      var self = this;

      $scope.canSubmit = true;
      $scope.event = null;

      $scope.mode = Mode;
      $scope.relatedEntities = [];

      $scope.eventsType = Event.eventsType;

      if (Event.eventsType.slug !== 'global' && Mode === 'CREATE') {
        Event.getRelatedEntities().then(function (response) {
          if (response.data.success) {
            $scope.relatedEntities = response.data.success.data;
          }
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      }

      $scope.onSubmit = function () {
        if (!Event.validate($scope.event)) {
          Error.error('INVALID_INPUT_DATA');
          return;
        }
        Event.save($scope.event).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
            $state.go('admin.events', {
              type: Event.eventsType.slug
            });
          }
        }, function (response) {
          Error.httpError(response);
        });
      };

      if (Mode === 'UPDATE') {
        Event.get($stateParams.id)
          .then(function (response) {
            if (response.data.success) {
              // TODO : Refactor next 3 lines, relatedEntity and relatedEntityName is awful
              $scope.event = response.data.success.data.event;
              $scope.event.relatedEntity = $scope.event[Event.eventsType.slug].id;
              $scope.event.relatedEntityName = $scope.event[Event.eventsType.slug].name;
            }
          }, function (response) {
            Error.httpError(response);
          }).finally(function () {
            $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
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