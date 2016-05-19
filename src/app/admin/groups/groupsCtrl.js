'use strict';

angular.module('siApp')
    .controller('GroupsCtrlAdmin', ['$scope', 'Error', 'DateTimeConverter', 'GroupsAdmin', 'Pagination', 'EVENTS',
        function ($scope, Error, DateTimeConverter, GroupsAdmin, Pagination, EVENTS) {
            var self = this;

            $scope.canPerformActions = true;
            $scope.pagination = Pagination.getPaginationHelper();

            $scope.loadGroups = function () {
                GroupsAdmin.getAll().then(function (response) {
                    if (response.data.success) {
                        $scope.pagination.loadEntities(response.data.success.data);
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
                });
            };

            $scope.deleteGroup = function (group) {
                $scope.canPerformActions = false;
                GroupsAdmin.remove(group.id).then(function (response) {
                    if (response.data.success) {
                        Error.success('CHANGES_SAVED');
                        $scope.pagination.removeEntity(group);
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

            $scope.loadGroups();
        }]);