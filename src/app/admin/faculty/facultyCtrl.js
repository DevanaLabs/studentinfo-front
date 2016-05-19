'use strict';

angular.module('siApp')
    .controller('FacultyCtrl', [
        '$scope',
        '$state',
        'Error',
        'Faculty',
        'EVENTS',
        function ($scope, $state, Error, Faculty, EVENTS) {

            var self = this;
            $scope.canPerformActions = true;

            $scope.onSubmit = function () {
                Faculty.changeSemesterYear($scope.faculty.semester, $scope.faculty.year).then(function (response) {
                    if (response.data.success) {
                        Error.success('CHANGES_SAVED');
                    }
                }, function (response) {
                    Error.httpError(response);
                });
            };

            Faculty.get().then(function (response) {
                if (response.data.success) {
                    $scope.faculty = {
                        semester: ''+response.data.success.data.faculty.settings.semester,
                        year: response.data.success.data.faculty.settings.year
                    }
                }
            }, function (response) {
                Error.httpError(response);
            }).finally(function () {
                $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
            });
        }]);