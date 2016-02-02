'use strict';

angular.module('siAdminApp')
  .controller('LoginCtrl', [
    'USER_ROLES',
    'AUTH_EVENTS',
    '$http',
    '$scope',
    '$rootScope',
    'Session',
    'AuthService',
    'toastr',
    function LoginCtrl (USER_ROLES, AUTH_EVENTS, $http, $scope, $rootScope, Session, AuthService, toastr) {

      $rootScope.globals = null; // Fix

      $scope.credentials = {
        email: '',
        password: ''
      };

      $scope.login = function (credentials) {
        AuthService.login(credentials).then(function (response) {
          console.log("Response after login");
          console.log(response);
          Session.create('admin', response.data.success.data.user);
          $http.defaults.withCredentials = true;
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(response.data.success.data.user);
        }, function (response) {
          console.log(response);
          $rootScope.$broadcast(AUTH_EVENTS.loginFail);
          toastr.error('Login nije validan');
        });
      };

    }
  ]);