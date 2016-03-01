'use strict';

angular.module('siApp')
  .controller('EventsCtrl', ['$scope', 'Error', 'Events', 'Pagination', 'EVENTS',
    function ($scope, Error, Events, Pagination, EVENTS) {
      var self = this;

      $scope.canPerformActions = true;
      $scope.pagination = Pagination.getPaginationHelper();
      $scope.eventsType = Events.eventsType;

      $scope.loadEvents = function () {
        Events.getAll().then(function (response) {
          if (response.data.success) {
            $scope.pagination.loadEntities(response.data.success.data);
          }
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      };

      $scope.deleteEvent = function (event) {
        $scope.canPerformActions = false;
        Events.remove(event.id).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
            $scope.pagination.removeEntity(event);
          }
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.canPerformActions = true;
        });
      };

      $scope.$watch('pagination.currentPage + pagination.perPage', function () {
        $scope.pagination.paginateEntities();
      });

      $scope.$watch('pagination.query', function (newValue, oldValue) {
        $scope.pagination.applySearchFilter(newValue);
      });

      $scope.loadEvents();
    }]);