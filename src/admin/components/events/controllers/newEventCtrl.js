'use strict';

angular.module('siAdminApp')

  .controller('NewEventCtrl', [
    '$scope',
    'EventService',
    'CourseService',
    'GroupService',
    '$stateParams',
    '$state',
    'DateTimeProcessService',
    'toastr',
    function ($scope,
              EventService,
              CourseService,
              GroupService,
              $stateParams,
              $state,
              DateTimeProcessService,
              toastr) {

      var vm = this;

      vm.event = {
        type: 0,
        group: 0,
        course: 0
      };

      $scope.save = function onSubmit () {
        var eventObject = null;

        if (vm.event.type == 0) {
          eventObject = new EventService.globalEvent();
        } else if (vm.event.type == 1) {
          eventObject = new EventService.courseEvent();
          eventObject.courseId = vm.event.course;
        } else {
          eventObject = new EventService.groupEvent();
          eventObject.groupId = vm.event.group;
        }

        eventObject.startsAt = DateTimeProcessService.rollback(vm.event.startsAt);
        eventObject.endsAt = DateTimeProcessService.rollback(vm.event.endsAt);
        eventObject.type = vm.event.stringType;
        eventObject.description = vm.event.description;

        eventObject.$save(function (response) {
          $state.go('events');
          toastr.success('Dogadjaj je sacuvan');
        }, function (response) {
          toastr.error('Dogadjaj nije sacuvan');
        });
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

      vm.typeOptions = EventService.types;

      CourseService.getAll({}, function (response) {
        vm.courses = response.success.data;
      });

      GroupService.getAll({}, function (response) {
        vm.groups = response.success.data.groups;
      });
    }]);