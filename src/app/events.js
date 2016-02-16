'use strict';

angular.module('siApp')
  .constant('EVENTS', {
    AUTH: {
      LOGIN_FAILED: 'auth.login_failed',
      LOGIN_SUCCESS: 'auth.login_success',
      LOGOUT_FAILED: 'auth.logout_failed',
      LOGOUT_SUCCESS: 'auth.logout_success',
      AUTHORIZED: 'auth.authorized',
      NOT_AUTHORIZED: 'auth.not_authorized',
      NOT_AUTHENTICATED: 'auth.not_authenticated',
      OAUTH2_ACCESS_TOKEN_CHANGED: 'auth.oauth2_access_token_changed',
      FACULTY_CHANGED: 'auth.faculty_slug_changed'
    },
    UI: {
      SHOW_LOADING_SCREEN: 'ui.show_loading_screen',
      HIDE_LOADING_SCREEN: 'ui.hide_loading_screen'
    },
    API: {
      REFRESH_START: 'api:refresh_start',
      REFRESH_SUCCESS: 'api:refresh_success',
      REFRESH_ERROR: 'api:refresh_error'
    }
  });