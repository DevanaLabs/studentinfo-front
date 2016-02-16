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
            $state.go('dashboard.home');
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