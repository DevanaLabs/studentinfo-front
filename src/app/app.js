'use strict';

var app = angular.module('siApp', ['ui.router', 'siApp.config']);

app.constant('ROLES', {
  any: '*',
  none: '!',
  student: 'student',
  admin: 'admin',
  superAdmin: 'super_admin'
});

app.run(function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    
  });
});