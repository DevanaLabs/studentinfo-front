'use strict';

angular.module('siAdminApp')
  .controller('LogoutCtrl', [
    '$http',
    'AUTH_EVENTS',
    '$scope',
    '$rootScope',
    '$state',
    'AuthService',
    function LogoutCtrl ($http, AUTH_EVENTS, $scope, $rootScope, $state, AuthService) {
      AuthService.logout(function () {
        $state.go('login');
        // Omg
        document.cookie = '';
        $http.defaults.withCredentials = false;
        $rootScope.globals = null;
      });
    }
  ]);