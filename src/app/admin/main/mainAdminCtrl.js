'use strict';

angular.module('siApp')
  .controller('MainAdminCtrl', ['$rootScope', '$scope', '$state', 'Auth', 'EVENTS',
    function ($rootScope, $scope, $state, Auth, EVENTS) {
      if (Auth.alreadyLoggedIn()) {
        $rootScope.user = Auth.user();
      }
    }]);