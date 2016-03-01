'use strict';

angular.module('siApp')
  .controller('ProfileCtrl', [
    '$scope',
    '$state',
    'Error',
    'Profile',
    'Auth',
    'EVENTS',
    function ($scope, $state, Error, Profile, Auth, EVENTS) {

      var self = this;
      $scope.password = {
        password: '',
        confirmation: ''
      };

      $scope.onSubmit = function () {
        if ($scope.password.password !== $scope.password.confirmation) {
          Error.error('INVALID_INPUT_DATA');
        }

        Profile.changePassword(Auth.user().id, $scope.password).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
          }
        }, function (response) {
          Error.httpError(response);
        });
      };

      $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
    }]);