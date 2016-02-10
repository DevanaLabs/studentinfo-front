'use strict';

angular.module('siApp')
  .factory('Auth', ['$rootScope', 'localStorageService', 'Api', 'OAuth2Client', 'ROLES', 'EVENTS',
    function ($rootScope, localStorageService, Api, OAuth2Client, ROLES, EVENTS) {
      var auth = {};

      var oauth2Params = OAuth2Client;

      var authParams = {
        user: {
          roles: []
        },
        oauth2: null
      };

      auth.login = function (credentials) {
        Api.login(angular.extend(credentials, oauth2Params)).then(function (response) {
            console.log(response);
            if (response.data.success) {
              var oauth2Token = response.data.success.data.oauth;

              Api.authUser({
                email: credentials.username,
                password: credentials.password
              }).
                then(function (response) {
                  var user = response.data.success.data.user;
                  auth.set({
                    user: user,
                    oauth2: oauth2Token
                  });
                  $rootScope.$broadcast(EVENTS.AUTH.LOGIN_SUCCESS);
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
        data.oauth2.expiresAt = moment().add(data.oauth2.expires_in, 'milliseconds');
        authParams = {
          user: {
            id: data.user.id,
            roles: [data.user.userType.toLowerCase()],
            userType: data.user.userType,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            faculty: data.user.faculty,
          },
          oauth2: data.oauth2
        };
        $rootScope.$broadcast(EVENTS.AUTH.OAUTH2_ACCESS_TOKEN_CHANGED, authParams.oauth2);
        $rootScope.$broadcast(EVENTS.AUTH.FACULTY_CHANGED, authParams.user.faculty.slug);
        localStorageService.set('auth', authParams);
      };

      auth.unset = function (data) {
        authParams = {
          user: {
            roles: []
          },
          oauth2: null
        };
        localStorageService.remove('auth');
      };

      auth.load = function () {
        auth.set(localStorageService.get('auth'));
      };

      auth.user = function () {
        return authParams.user;
      };

      auth.alreadyLoggedIn = function () {
        if (_.includes(localStorageService.keys(), 'auth')) {
          return moment(localStorageService.get('auth').oauth2.expiresAt).isAfter(moment());
        }
        return false;
      };

      auth.userExists = function () {
        return authParams.user.roles.length > 0;
      };

      return auth;
    }])
;