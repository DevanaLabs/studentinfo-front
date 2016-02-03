'use strict';

angular.module('siApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $state, Auth, EVENTS) {
    var self = this;

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.$on(EVENTS.auth.loginSuccess, function (data) {
      if (_.indexOf(Auth.user().roles, 'admin') !== -1) {
        $state.go('admin.home');
      } else if (_.indexOf(Auth.user().roles, 'student') !== -1) {
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
  });