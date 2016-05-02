'use strict';

angular.module('siApp')
  .controller('RegisterCtrl', ['$scope', '$stateParams', '$state', 'Error', 'Register', 'toastr', '$translate', 
    function ($scope, $stateParams, $state, Error, Register, toastr, $translate) {
      $scope.credentials = {
        username: '',
        password: {
          password: '',
          passwordConfirmation: ''
        }
      };

      $scope.loading = 'idle';

      Register.getUser($stateParams.registerToken).then(function (response) {
        if (response.data.success) {
          $scope.credentials.username = response.data.success.data.user.email.email;
        }
      }, function (response) {
        console.log(response);
        console.log(response.data == null);
        
        if(response.data == null) { 
          // if the registration token is invalid 
          // API returns 'Access-Control-Allow-Origin' header
          // with no response
          toastr.error($translate.instant('REGISTER_BAD_TOKEN'), $translate.instant('ERROR'));
        } else {
          Error.httpError(response);
        }
      });

      $scope.onSubmit = function () {
        if (Register.validatePassword($scope.credentials.password.password, $scope.credentials.password.passwordConfirmation)) {
          $scope.loading = 'loading';
          Register.registerUser($stateParams.registerToken, $scope.credentials.password).then(function (response) {
            $scope.loading = 'idle';
            if (response.data.success) {
              Error.success('REGISTER_SUCCESS');
              $state.go('login');
            }
          }, function (response) {
            $scope.loading = 'idle';
            Error.error(response);
          });
        } else {
          Error.error('INVALID_INPUT_DATA');
        }
      };
    }]);