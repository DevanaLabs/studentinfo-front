'use strict';

angular.module('siApp')
    .controller('ClassroomsCtrlAdmin', ['$scope', 'Error', 'DateTimeConverter', 'ClassroomsAdmin', 'Pagination', 'EVENTS',
        function ($scope, Error, DateTimeConverter, ClassroomsAdmin, Pagination, EVENTS) {
            var self = this;

            $scope.canPerformActions = true;
            $scope.pagination = Pagination.getPaginationHelper();

            $scope.loadClassrooms = function () {
                ClassroomsAdmin.getAll().then(function (response) {
                    if (response.data.success) {
                        $scope.pagination.loadEntities(response.data.success.data);
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
                });
            };

            $scope.deleteClassroom = function (classroom) {
                $scope.canPerformActions = false;
                ClassroomsAdmin.remove(classroom.id).then(function (response) {
                    if (response.data.success) {
                        Error.success('CHANGES_SAVED');
                        $scope.pagination.removeEntity(classroom);
                    }
                }, function (response) {
                    Error.httpError(response);
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

            $scope.loadClassrooms();
        }]);