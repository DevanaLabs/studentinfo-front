'use strict';

angular.module('siAdminApp')
  .controller('LogoutCtrl', [
    '$http',
    'AUTH_EVENTS',
    '$scope',
    '$rootScope',
    '$state',
    '$cookies',
    'AuthService',
    function LogoutCtrl ($http, AUTH_EVENTS, $scope, $rootScope, $state, $cookies, AuthService) {
      var self = this;

      AuthService.logout(function () {
        self.deleteAllCookies();
        $http.defaults.withCredentials = false;
        $rootScope.globals = null;
        //document.location = '/dist/index.html';
      });

      this.deleteAllCookies = function () {
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
          console.log('delete cookie ' + k);
          $cookies.remove(k);
        });
      }
    }
  ]);