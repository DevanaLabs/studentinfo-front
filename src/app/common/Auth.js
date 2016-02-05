'use strict';

angular.module('siApp')
  .factory('Auth', ['$rootScope', 'localStorageService', 'Api', 'OAuth2Client', 'ROLES', 'EVENTS',
    function ($rootScope, localStorageService, Api, OAuth2Client, ROLES, EVENTS) {
      var auth = {};

      var oauth2Params = OAuth2Client;

      var user = {
        roles: []
      };

      auth.login = function (credentials) {
        Api.login(angular.extend(credentials, oauth2Params)).then(function (response) {
            console.log(response);
            if (response.data.success) {
              var oauthToken = response.data.success.data.oauth;
              $rootScope.$broadcast(EVENTS.AUTH.OAUTH2_ACCESS_TOKEN_CHANGED, oauthToken);

              Api.authUser({
                email: credentials.username,
                password: credentials.password
              }).
                then(function (response) {
                  var user = response.data.success.data;
                  user.oauth = oauthToken;
                  auth.set(user);
                  $rootScope.$broadcast(EVENTS.AUTH.LOGIN_SUCCESS, response.data.success.data);
                  $rootScope.$broadcast(EVENTS.AUTH.AUTHORIZED);
                }, function (response) {
                  $rootScope.$broadcast(EVENTS.AUTH.LOGIN_FAILED, response);
                });
            }
            else {
              $rootScope.$broadcast(EVENTS.AUTH.LOGIN_FAILED, response);
            }
          }, function (response) {
            $rootScope.$broadcast(EVENTS.AUTH.LOGIN_FAILED, response);
          }
        )
        ;
      };

      auth.logout = function () {
        // TODO : After it's supported on API
      };

      auth.set = function (data) {
        console.log(data);
        data.oauth.expiresAt = moment().add(data.oauth.expires_in, 'seconds');
        user = {
          roles: [data.user.userType.toLowerCase()],
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          faculty: data.user.faculty,
          accessToken: data.oauth
        };
        localStorageService.set('user', user);
      };

      auth.unset = function (data) {
        user = {
          roles: []
        };
        localStorageService.remove('user');
      };

      auth.load = function () {
        user = localStorageService.get('user');
      };

      auth.user = function () {
        return user;
      };

      auth.alreadyLoggedIn = function () {
        if (_.includes(localStorageService.keys(), 'user')) {
          // TODO : Check for access token expiration
          return true;
        }
        return false;
      };

      auth.userExists = function () {
        return user.roles.length > 0;
      };

      return auth;
    }])
;