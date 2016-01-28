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
          Session.create(response.data.id, response.data.success.data.user.id, 'admin', response.data.success.data.user);
          $http.defaults.withCredentials = true;
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(response.data.success.data.user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFail);
          toastr.error('Login nije validan');
        });
      };

    }
  ]);