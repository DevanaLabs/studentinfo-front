'use strict';

angular.module('siApp')
    .controller('CoursesCtrlAdmin', ['$scope', 'Error', 'DateTimeConverter', 'CoursesAdmin', 'Pagination', 'EVENTS',
        function ($scope, Error, DateTimeConverter, CoursesAdmin, Pagination, EVENTS) {
            var self = this;

            $scope.canPerformActions = true;
            $scope.pagination = Pagination.getPaginationHelper();

            $scope.loadCourses = function () {
                CoursesAdmin.getAll().then(function (response) {
                    if (response.data.success) {
                        $scope.pagination.loadEntities(response.data.success.data);
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
                });
            };

            $scope.deleteCourse = function (course) {
                $scope.canPerformActions = false;
                CoursesAdmin.remove(course.id).then(function (response) {
                    if (response.data.success) {
                        Error.success('CHANGES_SAVED');
                        $scope.pagination.removeEntity(course);
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

            $scope.loadCourses();
        }]);