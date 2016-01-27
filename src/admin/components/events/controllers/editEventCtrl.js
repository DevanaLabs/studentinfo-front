'use strict';

angular.module('siAdminApp')

  .controller('EditEventCtrl', [
    '$scope',
    'EventService',
    '$stateParams',
    '$state',
    'toastr',
    'DateTimeProcessService',
    function ($scope,
              EventService,
              $stateParams,
              $state,
              toastr,
              DateTimeProcessService) {
      var vm = this;

      vm.event = {};

      $scope.save = function onSubmit () {
        var event = {
          id: vm.event.id,
          startsAt: DateTimeProcessService.rollback(vm.event.startsAt),
          endsAt: DateTimeProcessService.rollback(vm.event.endsAt),
          description: vm.event.description,
          type: vm.event.type
        };
        EventService.globalEvent.update({id: event.id}, event, function (response) {
          $state.go('events');
          toastr.success('Dogadjaj je sacuvan');
        }, function (response) {
          toastr.error('Dogadjaj nije sacuvan');
        });
      };

      vm.resetModel = function resetModel () {
        vm.event = {};
      };

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

      var ev = EventService.globalEvent.get({id: $stateParams.id}, function () {
        var event = ev.success.data.event;
        console.log(event);
        vm.event = DateTimeProcessService.process(event);
        console.log(vm.event);
      });
    }]);