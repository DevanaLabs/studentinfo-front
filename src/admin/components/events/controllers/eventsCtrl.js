'use strict';

angular.module('siAdminApp')
  .controller('EventsCtrl', [
    '$scope',
    '$state',
    'EventService',
    'DateTimeProcessService',
    'toastr',
    function ($scope, $state, EventService, DateTimeProcessService, toastr) {
      var self = this;

      $scope.loadedAll = false;
      $scope.events = [];
      $scope.query = '';

      this.loadEvents = function (start, count) {
        var response = EventService.generic.getAll({start: start, count: count}, function () {
          if (response.success) {
            if (response.success.data.length === 0) {
              toastr.alert('Nema vise dogadjaja');
              $scope.loadedAll = true;
              return;
            }
            _(response.success.data).forEach(function (e) {
              return DateTimeProcessService.process(e);
            });
            $scope.events = $scope.events.concat(response.success.data);
          } else {
            toastr.error('Error loading events');
          }
        });
      };

      $scope.showMore = function () {
        var start = $scope.events.length;
        var count = 10;
        self.loadEvents(start, count);
      };

      $scope.deleteEvent = function (id) {
        EventService.generic.remove({id: id}, function (response) {
          if (response.success) {
            toastr.success('Dogadjaj je obrisan');
            _.remove($scope.events, function (event) {
              return event.id == id;
            });
          } else {
            toastr.error('Dogadjaj nije obrisan!');
          }
        });
      };

      this.loadEvents(0, 5);
    }]);