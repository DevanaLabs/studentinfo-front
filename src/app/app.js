'use strict';

angular.module('siApp', ['ui.router', 'LocalStorageModule', 'siApp.config', 'siApp.dashboard', 'ui.bootstrap',
  'pascalprecht.translate', 'ngFileUpload', 'toastr', 'ngAnimate', 'angularMoment'])
  .constant('ROLES', {
    any: '*',
    none: '!',
    student: 'student',
    admin: 'admin',
    superAdmin: 'super_admin'
  });

angular.module('siApp')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('OAuth2Interceptor');
  }])
  .run(['$rootScope', '$state', 'Privilege', 'Auth', 'EVENTS',
    function ($rootScope, $state, Privilege, Auth, EVENTS) {

      if (Auth.alreadyLoggedIn()) {
        Auth.load();
      }

      $rootScope.$on(EVENTS.AUTH.NOT_AUTHORIZED, function (event, fromState, fromParams) {
        if (Auth.userExists()) {
          if (fromState.abstract) {
            $state.go(Privilege.redirectStateBasedOnRole());
          } else {
            $state.go(fromState, fromParams);
          }
        } else {
          $rootScope.$emit(EVENTS.AUTH.NOT_AUTHENTICATED);
          $state.go('login');
        }
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!Privilege.check(toState.data.authorizedRoles)) {
          event.preventDefault();
          console.log('Not authorized');
          $rootScope.$broadcast(EVENTS.AUTH.NOT_AUTHORIZED, fromState, fromParams);
        }
      });

    }]);

angular.module('siApp')
  .constant('WEEKDAYS', [
    {
      id: 0,
      name: 'DAY_1'
    },
    {
      id: 1,
      name: 'DAY_2'
    },
    {
      id: 2,
      name: 'DAY_3'
    },
    {
      id: 3,
      name: 'DAY_4'
    },
    {
      id: 4,
      name: 'DAY_5'
    },
    {
      id: 5,
      name: 'DAY_6'
    },
    {
      id: 6,
      name: 'DAY_7'
    }]);