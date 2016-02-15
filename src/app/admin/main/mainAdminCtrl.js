'use strict';

angular.module('siApp')
  .controller('MainAdminCtrl', ['$rootScope', '$window', '$scope', '$state', 'Auth', 'EVENTS',
    function ($rootScope, $window, $scope, $state, Auth, EVENTS) {
      if (Auth.alreadyLoggedIn()) {
        $rootScope.user = Auth.user();
      }
    }]);