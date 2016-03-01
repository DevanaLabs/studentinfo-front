'use strict';

angular.module('siApp')
  .controller('NewStaffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'Error',
    'Entities',
    'EVENTS',
    'Mode',
    function ($scope, $state, $stateParams, Error, Entities, EVENTS, Mode) {
      var self = this;

      $scope.canSubmit = true;
      $scope.staffType = Entities.staffType;

      $scope.onSubmit = function () {
        Entities.save($scope.user).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
            $state.go('admin.staff', {type: $stateParams.type});
          }
        }, function (response) {
          Error.httpError(response);
        });
      };

      if (Mode === 'UPDATE') {
        Entities.get($stateParams.id).then(function (response) {
          if (response.data.success) {
            $scope.user = _.values(response.data.success.data)[0];
            $scope.user.email = $scope.user.email.email;
          }
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      } else {
        $scope.user = {};
        $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
      }
    }
  ]);
