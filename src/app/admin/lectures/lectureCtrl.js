'use strict';

angular.module('siApp')
  .controller('LectureCtrl', ['$q', '$scope', '$state', '$stateParams', 'toastr', 'Lectures', 'Professors', 'Assistants',
    'Courses', 'Classrooms', 'DateTimeConverter', 'Mode', 'EVENTS', 'WEEKDAYS',
    function ($q, $scope, $state, $stateParams, toastr, Lectures, Professors, Assistants,
              Courses, Classrooms, DateTimeConverter, Mode, EVENTS, WEEKDAYS) {

      $scope.canSubmit = true;
      $scope.days = WEEKDAYS;

      $scope.types = Lectures.types;

      $scope.lecture = null;
      $scope.mode = Mode;

      $scope.courses = [];
      $scope.teachers = [];
      $scope.classrooms = [];

      $scope.onSubmit = function () {
        $scope.canSubmit = false;
        $scope.lecture.time.endsAt.day = $scope.lecture.time.startsAt.day;
        Lectures.save($scope.lecture).then(function (response) {
          if (response.data.success) {
            toastr.success('Sacuvano');
            $state.go('admin.lectures');
          }
        }, function () {
          toastr.error('Greska');
        }).finally(function () {
          $scope.canSubmit = true;
        });
      };

      var lecturePromise = null;
      if (Mode === 'UPDATE') {
        lecturePromise = Lectures.get($stateParams.id);
      } else {
        lecturePromise = $q.when({data: { success: { data: { lecture: Lectures.getNewInstance()}}}});
      }

      $q.all([
        Courses.getAll(),
        Professors.getAll(),
        Assistants.getAll(),
        Classrooms.getAll(),
        lecturePromise
      ]).then(function (responses) {
        $scope.courses = responses[0].data.success.data;
        $scope.teachers = responses[1].data.success.data.concat(responses[2].data.success.data);
        $scope.classrooms = responses[3].data.success.data;
        $scope.lecture = responses[4].data.success.data.lecture;
      }, function () {
        toastr.error('Greska!');
      }).finally(function () {
        $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
      });

    }]);