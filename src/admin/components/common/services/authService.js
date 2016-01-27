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
          .post(API.url_base + '/auth?XDEBUG_SESSION_START=1', credentials);
      };

      authService.logout = function (callback) {
        return $http
          .delete('http://api.studentinfo.dev/auth?XDEBUG_SESSION_START=1')
          .then(function (res) {
            console.log("Response after logout");
            console.log(res);
            Session.destroy();
            callback();
          });
      };

      authService.isAuthenticated = function () {
        return Session.userId;
      };

      authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
      };

      return authService;
    }]);

