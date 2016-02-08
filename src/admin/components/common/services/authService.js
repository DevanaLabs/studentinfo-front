'use strict';

angular.module('siAdminApp')
  .factory('AuthService', [
    'API',
    'AUTH_EVENTS',
    'Session',
    '$http',
    '$cookies',
    '$rootScope',
    function AuthService (API, AUTH_EVENTS, Session, $http, $cookies, $rootScope) {
      var authService = {};

      authService.login = function (credentials) {
        return $http
          .post(API.url_base + '/auth', credentials);
      };

      authService.logout = function (callback) {
        $cookies.remove('access_token');
      };

      authService.isAuthenticated = function () {
        return Session.exists;
      };

      authService.isAuthorized = function (authorizedRoles) {
        return (authService.isAuthenticated());
      };

      return authService;
    }]);

