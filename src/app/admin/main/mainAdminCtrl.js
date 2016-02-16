'use strict';

angular.module('siApp')
  .controller('MainAdminCtrl', ['$rootScope', '$window', '$scope', '$state', 'Auth', 'EVENTS',
    function ($rootScope, $window, $scope, $state, Auth, EVENTS) {

      $rootScope.globals = {
        pleaseWait: false
      };

      if (Auth.alreadyLoggedIn()) {
        $rootScope.user = Auth.user();
      }

      $rootScope.$on('$stateChangeStart', function () {
        $rootScope.$emit(EVENTS.UI.SHOW_LOADING_SCREEN);
      });

      $rootScope.$on(EVENTS.UI.SHOW_LOADING_SCREEN, function () {
        console.log('Show pleaseWait');
        $rootScope.globals.pleaseWait = true;
      });

      $rootScope.$on(EVENTS.UI.HIDE_LOADING_SCREEN, function () {
        console.log('Hide pleaseWait');
        $rootScope.globals.pleaseWait = false;
      });

      $rootScope.$emit(EVENTS.UI.SHOW_LOADING_SCREEN);
    }]);