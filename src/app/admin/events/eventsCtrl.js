'use strict';

angular.module('siApp')
  .controller('EventsCtrl', ['$scope', 'toastr', 'Events', 'Pagination', 'EVENTS',
    function ($scope, toastr, Events, Pagination, EVENTS) {
      var self = this;

      $scope.canPerformActions = true;
      $scope.pagination = Pagination.getPaginationHelper();
      $scope.eventsType = Events.eventsType;

      $scope.loadEvents = function () {
        Events.getAll().then(function (response) {
          if (response.data.success) {
            $scope.pagination.loadEntities(response.data.success.data);
          }
        }, function () {
          toastr.error('Greska prilikom ucitavanja dogadjaja!');
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      };

      $scope.deleteEvent = function (event) {
        $scope.canPerformActions = false;
        Events.remove(event.id).then(function (response) {
          if (response.data.success) {
            toastr.success('Uspesno obrisano');
            $scope.pagination.removeEntity(event);
          }
        }, function () {
          toastr.error('Greska prilikom brisanja!');
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