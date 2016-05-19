'use strict';

angular.module('siApp')
    .controller('ClassroomCtrlAdmin', ['$q', '$scope', '$state', '$stateParams', 'Error', 'ClassroomsAdmin', 'DateTimeConverter',
        'Mode', 'EVENTS',
        function ($q, $scope, $state, $stateParams, Error, ClassroomsAdmin, DateTimeConverter, Mode, EVENTS) {

            $scope.canSubmit = true;

            $scope.onSubmit = function () {
                $scope.canSubmit = false;
                ClassroomsAdmin.save($scope.classroom).then(function (response) {
                    if (response.data.success) {
                        Error.success('CHANGES_SAVED');
                        $state.go('admin.classrooms');
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.canSubmit = true;
                });
            };

            var classroomPromise = null;
            if (Mode === 'UPDATE') {
                classroomPromise = ClassroomsAdmin.get($stateParams.id).then(function (response) {
                    if (response.data.success) {
                        $scope.classroom = _.values(response.data.success.data)[0];
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
                });
            } else {
                classroomPromise = $q.when({data: { success: { data: { classroom: Classrooms.getNewInstance()}}}});
            }

            $q.all([
                classroomPromise
            ]).then(function (responses) {
            }, function (response) {
                Error.httpError(response);
            }).finally(function () {
                $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
            });

        }]);