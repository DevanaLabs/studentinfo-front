'use strict';

angular.module('siApp')
  .controller('ProfileCtrl', [
    '$scope',
    '$state',
    'toastr',
    'Profile',
    'Auth',
    'EVENTS',
    function ($scope, $state, toastr, Profile, Auth, EVENTS) {

      var self = this;
      $scope.password = {
        password: '',
        confirmation: ''
      };

      $scope.onSubmit = function () {
        if ($scope.password.password !== $scope.password.confirmation) {
          toastr.error('Lozinke se ne poklapaju');
        }

        Profile.changePassword(Auth.user().id, $scope.password).then(function (response) {
          if (response.data.success) {
            toastr.success('Promena lozinke je uspela');
          }
        }, function (response) {
          toastr.error('Promena lozinke nije uspela');
        });
      };

      $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
    }]);