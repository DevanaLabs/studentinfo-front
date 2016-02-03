'use strict';

angular.module('siApp')
  .constant('EVENTS', {
    auth: {
      loginFailed: 'auth:login-failed',
      loginSuccess: 'auth:login-success',
      notAuthorized: 'auth:not-authorized',
      notAuthenticated: 'auth:not-authenticated',
    },
    api: {
      refreshStart: 'api:refresh-start',
      refreshSuccess: 'api:refresh-success',
      refreshError: 'api:refresh-error'
    }
  });