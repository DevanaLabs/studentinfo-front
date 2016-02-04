'use strict';

angular.module('siApp', ['ui.router', 'LocalStorageModule', 'siApp.config', 'pascalprecht.translate'])
  .constant('ROLES', {
    any: '*',
    none: '!',
    student: 'student',
    admin: 'admin',
    superAdmin: 'super_admin'
  })
  .run(['$rootScope', '$state', 'Privilege', 'Auth', 'EVENTS',
    function ($rootScope, $state, Privilege, Auth, EVENTS) {

      if (Auth.alreadyLoggedIn()) {
        Auth.load();
        $rootScope.$broadcast(EVENTS.AUTH.AUTHORIZED);
      }

      $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!Privilege.check(toState.data.authorizedRoles)) {
          event.preventDefault();
          $rootScope.$broadcast(EVENTS.NOT_AUTHORIZED);
        }
      });
    }]);