'use strict';

angular.module('siApp', ['ui.router', 'LocalStorageModule', 'siApp.config', 'siApp.dashboard', 'ui.bootstrap', 'pascalprecht.translate', 'toastr'])
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
            // TODO : Looping, should be redirected on homepage based on roles
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
          console.log('Not authorized');
          event.preventDefault();
          $rootScope.$broadcast(EVENTS.AUTH.NOT_AUTHORIZED, fromState, fromParams);
        }
      });

    }])
  .constant('LANGUAGE_CONSTANTS', {
    CYRILIC: ['А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш']
  });
