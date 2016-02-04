'use strict';

angular.module('siApp')
  .controller('MainAdminCtrl', ['$rootScope', '$scope', '$state', 'Auth', 'EVENTS',
    function ($rootScope, $scope, $state, Auth, EVENTS) {

      $scope.$on(EVENTS.AUTH.AUTHORIZED, function () {
        $scope.user = Auth.user();
      });


    }]);