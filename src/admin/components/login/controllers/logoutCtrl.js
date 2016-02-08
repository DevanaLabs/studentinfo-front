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

      this.deleteAllCookies = function () {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      };

      self.deleteAllCookies();
      console.log('asdf done');
      $rootScope.globals = null;
      document.location = '/index.html';

    }
  ]);