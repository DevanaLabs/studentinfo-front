'use strict';

angular.module('siApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'Auth', 'Privilege', 'EVENTS', 'ROLES',
    function ($rootScope, $scope, $state, Auth, Privilege, EVENTS, ROLES) {
      var self = this;

      $scope.credentials = {
        username: '',
        password: ''
      };

      $scope.$on(EVENTS.AUTH.LOGIN_SUCCESS, function (event, data) {
        if (Privilege.check([ROLES.superAdmin, ROLES.admin])) {
          $state.go('admin.overview');
        } else {
          $state.go('dashboard.home');
        }
      });

      $scope.onSubmit = function () {
        if (self.validateCredentials($scope.credentials)) {
          Auth.login($scope.credentials);
        }
      };

      this.validateCredentials = function (credentials) {
        // TODO: This shouldn't be in a controller
        return (credentials.username.length > 0 && credentials.password.length > 0);
      };
    }]);