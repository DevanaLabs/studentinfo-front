'use strict';

angular.module('siAdminApp')

  .controller('NewLectureNotificationCtrl', [
    '$scope',
    'NotificationService',
    'LectureService',
    '$stateParams',
    '$state',
    'DateTimeProcessService',
    'toastr',
    function ($scope,
              NotificationService,
              LectureService,
              $stateParams,
              $state,
              DateTimeProcessService,
              toastr) {

      var vm = this;

      vm.notification = {
        lecture: 0
      };

      // TODO : Omg fix this count
      LectureService.getAll({start: 0, count: 10000}, function (response) {
        $scope.lectures = _.forEach(response.success.data, function (lecture) {
          lecture.name = lecture.type + ': ' + lecture.course.name;
          lecture.formatedTime =
            moment().startOf('week').isoWeekday(1).add(lecture.time.startsAt, 'seconds').format('HH:mm DD/MM/YYYY')
            + ' - '
            + moment().startOf('week').isoWeekday(1).add(lecture.time.endsAt, 'seconds').format('HH:mm DD/MM/YYYY');
        });
      });

      $scope.save = function onSubmit () {
        var notificationObject = null;

        notificationObject = new NotificationService.lectureNotification();
        notificationObject.lectureId = $scope.selectedLecture.id;

        notificationObject.expiresAt = DateTimeProcessService.rollback(vm.notification.expiresAt);
        notificationObject.description = vm.notification.description;

        notificationObject.$save(function (response) {
          $state.go('lectureNotifications');
          toastr.success('Obavestenje je sacuvano');
        }, function (response) {
          toastr.error('Obavestenje nije sacuvano');
        });
      };

      $scope.status = {
        expiresAt: {
          opened: false
        }
      };

      $scope.openExpiresAt = function ($notification) {
        $scope.status.expiresAt.opened = true;
      };

      $scope.$watch('lecture', function (newValue, oldValue) {
        $scope.selectedLecture = _.filter($scope.lectures, function (lecture) {
          return lecture.id == $scope.lecture;
        })[0];
      });
    }]);