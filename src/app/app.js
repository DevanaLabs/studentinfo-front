'use strict';

angular.module('siApp', ['ui.router', 'LocalStorageModule', 'siApp.config'])
  .constant('ROLES', {
    any: '*',
    none: '!',
    student: 'student',
    admin: 'admin',
    superAdmin: 'super_admin'
  })
  .run(['$rootScope', '$state', 'Privilege', 'EVENTS',
    function ($rootScope, $state, Privilege, EVENTS) {
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!Privilege.check(toState.data.authorizedRoles)) {
          event.preventDefault();
          $rootScope.$broadcast(EVENTS.NOT_AUTHORIZED);
        }
      });
    }]);