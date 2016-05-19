'use strict';

angular.module('siApp')
    .controller('GroupCtrlAdmin', ['$q', '$scope', '$state', '$stateParams', 'Error', 'GroupsAdmin', 'DateTimeConverter',
        'Mode', 'EVENTS',
        function ($q, $scope, $state, $stateParams, Error, GroupsAdmin, DateTimeConverter, Mode, EVENTS) {
            $scope.canSubmit = true;

            $scope.onSubmit = function () {
                $scope.canSubmit = false;
                GroupsAdmin.save($scope.group).then(function (response) {
                    if (response.data.success) {
                        Error.success('CHANGES_SAVED');
                        $state.go('admin.groups');
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.canSubmit = true;
                });
            };

            var groupPromise = null;
            if (Mode === 'UPDATE') {
                groupPromise = GroupsAdmin.get($stateParams.id).then(function (response) {
                    if (response.data.success) {
                        $scope.group = _.values(response.data.success.data)[0];
                    }
                }, function (response) {
                    Error.httpError(response);
                }).finally(function () {
                    $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
                });
            } else {
                groupPromise = $q.when({data: { success: { data: { group: Groups.getNewInstance()}}}});
            }

            $q.all([
                groupPromise
            ]).then(function (responses) {
            }, function (response) {
                Error.httpError(response);
            }).finally(function () {
                $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
            });

        }]);