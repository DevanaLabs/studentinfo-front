'use strict';

angular.module('siApp')
  .controller('LogoutCtrl', ['$scope', '$state', 'toastr', 'Auth', 'EVENTS',
    function ($scope, $state, toastr, Auth, EVENTS) {
      $scope.$on(EVENTS.AUTH.LOGOUT_SUCCESS, function (event, data) {
        toastr.success('Pozdrav');
        $state.go('login');
      });
      Auth.logout();
    }]);
