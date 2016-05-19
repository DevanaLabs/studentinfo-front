'use strict';

angular.module('siApp')
    .controller('CourseCtrlAdmin', ['$q', '$scope', '$state', '$stateParams', 'Error', 'CoursesAdmin', 'DateTimeConverter',
        'Mode', 'EVENTS',
        function ($q, $scope, $state, $stateParams, Error, CoursesAdmin, DateTimeConverter, Mode, EVENTS) {

            $scope.canSubmit = true;

            $scope.onSubmit = function () {
                $scope.canSubmit = false;
                CoursesAdmin.save($scope.course).then(function (response) {
                    if (response.data.success) {
                        Error.success('CHANGES_SAVED');
                        $state.go('admin.courses');
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.canSubmit = true;
                });
            };

            var coursePromise = null;
            if (Mode === 'UPDATE') {
                coursePromise = CoursesAdmin.get($stateParams.id).then(function (response) {
                    if (response.data.success) {
                        $scope.course = _.values(response.data.success.data)[0];
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
                });
            } else {
                coursePromise = $q.when({data: { success: { data: { course: Courses.getNewInstance()}}}});
            }

            $q.all([
                coursePromise
            ]).then(function (responses) {
            }, function (response) {
                Error.httpError(response);
            }).finally(function () {
                $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
            });

        }]);