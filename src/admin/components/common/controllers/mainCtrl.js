'use strict';

angular.module('siAdminApp')
  .controller('MainCtrl', [
    '$scope',
    '$rootScope',
    'AUTH_EVENTS',
    'USER_ROLES',
    'AuthService',
    '$state',
    '$http',
    function ($scope, $rootScope, AUTH_EVENTS, USER_ROLES, AuthService, $state, $http) {
      $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
        $rootScope.globals = {
          loggedIn: true,
          currentUser: user
        };
      };

      $scope.$on(AUTH_EVENTS.loginSuccess, function () {
        console.log('Handle loginSuccess from MainCtrl');
        $http.defaults.withCredentials = true;
        $state.go('home');
      });

      $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
        console.log('Handle notAuthenticated from MainCtrl');
        document.location = 'dist/login.html';
      });

    }]);