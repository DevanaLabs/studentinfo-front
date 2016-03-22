'use strict';

angular.module('siApp')
  .controller('RecoverCtrl', ['$scope', '$stateParams', '$state', 'Error', 'Recover', '$translate', 
    function ($scope, $stateParams, $state, Error, Recover, $translate) {
       $scope.credentials = {
         password: {
           password: '',
           passwordConfirmation: ''
         }
       };

       $scope.onSubmit = function () {
         if (Recover.validatePassword($scope.credentials.password.password, $scope.credentials.password.passwordConfirmation)) {
           Recover.setPassword($stateParams.recoverToken, $scope.credentials.password).then(function (response) {
             if (response.data.success) {
               Error.success('RECOVERY_SUCCESS');
               $state.go('login');
             }
           }, function (response) {
             Error.error(response);
           });
         } else {
           Error.error('INVALID_INPUT_DATA');
         }
           return false;
       };
    }]);