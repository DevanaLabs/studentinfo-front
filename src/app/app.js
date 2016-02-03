'use strict';

angular.module('siApp', ['ui.router', 'LocalStorageModule', 'siApp.config'])
  .constant('ROLES', {
    any: '*',
    none: '!',
    student: 'student',
    admin: 'admin',
    superAdmin: 'super_admin'
  })
  .run(function ($rootScope, $state, Privilege, EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (!Privilege.check(next.data.authorizedRoles)) {
        event.preventDefault();
        $rootScope.$broadcast(EVENTS.notAuthorized);
      }
    });
  });