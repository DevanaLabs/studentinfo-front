'use strict';

angular.module('siApp')
  .controller('EventsCtrl', ['$scope', 'toastr', 'DateTimeConverter', 'Events', 'Pagination',
    function ($scope, toastr, DateTimeConverter, Events, Pagination) {
      var self = this;

      $scope.pagination = Pagination.getPaginationHelper();
      $scope.eventsType = Events.eventsType;

      $scope.loadEvents = function () {
        Events.getAll({}).then(function (response) {
          if (response.data.success) {
            var events = _.forEach(response.data.success.data, function (e) {
              e.selected = false;
            });
            $scope.pagination.loadEntities(events);
          }
        }, function (response) {
          toastr.error('Greska prilikom ucitavanja dogadjaja!');
        });
      };

      $scope.deleteEvent = function (event) {
        Events.remove(event.id).then(function (response) {
          if (response.data.success) {
            toastr.success('Uspesno obrisano');
            _.remove($scope.pagination.entities, event);
            event.selected = false;
            $scope.pagination.entitySelectChanged(event);
            $scope.pagination.paginateEntities();
          }
        }, function () {
          toastr.error('Greska prilikom brisanja!');
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