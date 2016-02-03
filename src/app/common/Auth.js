'use strict';

angular.module('siApp')
.factory('Auth', function ($rootScope, localStorageService, Api, ROLES, EVENTS) {
    var auth = {};

    var oauth2Params = {
      'client_id': '1',
      'client_secret': 'secret',
      'grant_type': 'password'
    };

    var user = {
      roles: []
    };

    auth.login = function (credentials) {
      Api.login(angular.extend(credentials, oauth2Params)).then(function (response) {
        if (response.data.success) {
          auth.set(response.data.success.data);
          $rootScope.$broadcast(EVENTS.auth.loginSuccess, response.data.success.data);
        } else {
          $rootScope.$broadcast(EVENTS.auth.loginFailed, response);
        }
      }, function (response) {
        $rootScope.$broadcast(EVENTS.auth.loginFailed, response);
      });
    };

    auth.logout = function () {
      // TODO : After it's supported on API
    };

    auth.set = function (data) {
      user = {
        roles: [data.user.userType.toLowerCase()],
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        faculty: data.user.faculty,
        accessToken: data.oauth.access_token
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

    return auth;
  });