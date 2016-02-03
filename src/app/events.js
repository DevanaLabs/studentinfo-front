'use strict';

var app = angular.module('siApp');

app.constant('EVENTS', {
  auth: {
    notAuthorized: 'auth:not-authorizes',
    notAuthenticated: 'auth:not-authenticated',
  }
});