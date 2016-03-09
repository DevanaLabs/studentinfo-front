'use strict';

angular.module('siApp')
  .controller('RegisterCtrl', ['$scope', '$stateParams', '$state', 'Error', 'Register',
    function ($scope, $stateParams, $state, Error, Register) {
      $scope.credentials = {
        username: '',
        password: {
          password: '',
          passwordConfirmation: ''
        }
      };

      Register.getUser($stateParams.registerToken).then(function (response) {
        if (response.data.success) {
          $scope.credentials.username = response.data.success.data.user.email.email;
        }
      }, function (response) {
        Error.httpError(response);
      });

      $scope.onSubmit = function () {
        if (Register.validatePassword($scope.credentials.password.password, $scope.credentials.password.passwordConfirmation)) {
          Register.registerUser($stateParams.registerToken, $scope.credentials.password).then(function (response) {
            if (response.data.success) {
              Error.success('REGISTER.SUCCESS');
              $state.go('login');
            }
          }, function (response) {
            Error.error(response);
          });
        } else {
          Error.error('INVALID_INPUT_DATA');
        }
      };
    }]);