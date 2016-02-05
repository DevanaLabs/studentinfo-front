'use strict';

angular.module('siApp')
  .constant('EVENTS', {
    AUTH: {
      LOGIN_FAILED: 'auth.login_failed',
      LOGIN_SUCCESS: 'auth.login_success',
      AUTHORIZED: 'auth.authorized',
      NOT_AUTHORIZED: 'auth.not_authorized',
      NOT_AUTHENTICATED: 'auth.not_authenticated',
    },
    API: {
      REFRESH_START: 'api:refresh_start',
      REFRESH_SUCCESS: 'api:refresh_success',
      REFRESH_ERROR: 'api:refresh_error'
    }
  });