'use strict';

angular.module('siAdminApp')
  .controller('AdminCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'AdminService',
    '$http',
    'Session',
    'toastr',
    function ($scope, $rootScope, $state, AdminService, $http, Session, toastr) {

      var self = this;
      $scope.password = '';
      $scope.passwordConfirmation = '';

      $scope.save = function onSubmit() {
        if ($scope.password !== $scope.passwordConfirmation) {
          toastr.error('Lozinke se ne poklapaju');
        }

        var data = {
          'password': $scope.password,
          'password_confirmation': $scope.passwordConfirmation
        };

        AdminService.updatePassword({id: $rootScope.globals.currentUser.id}, data, function (response) {
          if (response.success) {
            toastr.success('Promena lozinke je uspela');
          }
        }, function (response) {
          toastr.error('Promena lozinke nije uspela');
        })
      }

    }]);