'use strict';

angular.module('siApp')
  .controller('LogoutCtrl', ['$scope', '$state', 'Error', 'Auth', 'EVENTS',
    function ($scope, $state, Error, Auth, EVENTS) {

      $scope.$on(EVENTS.AUTH.LOGOUT_SUCCESS, function (event, data) {
        Error.success('GOODBYE');
        $state.go('login');
      });

      Auth.logout();
    }]);
