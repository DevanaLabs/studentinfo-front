'use strict';

angular.module('siApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'toastr', '$translate', 'Auth', 'Privilege', 'EVENTS', 'ROLES',
    function ($rootScope, $scope, $state, toastr, $translate, Auth, Privilege, EVENTS, ROLES) {
      var self = this;

      $scope.credentials = {
        username: '',
        password: ''
      };

      $scope.$on(EVENTS.AUTH.LOGIN_SUCCESS, function (event, data) {
        $state.go(Privilege.redirectStateBasedOnRole());
      });

      $scope.$on(EVENTS.AUTH.LOGIN_FAILED, function (event, data) {
        if (data.data.error == 'invalid_credentials') {
          toastr.error($translate.instant('LOGIN.ERROR.INVALID_CREDENTIALS'));
        }
        else {
          toastr.error($translate.instant(data.error));
        }

      });

      $scope.onSubmit = function () {
        if (self.validateCredentials($scope.credentials)) {
          Auth.login($scope.credentials);
        } else {
          toastr.error($translate.instant('LOGIN.ERROR.INVALID_INPUT'));
        }
      };

      this.validateCredentials = function (credentials) {
        // TODO: This shouldn't be in a controller
        return (credentials.username.length > 0 && credentials.password.length > 0);
      };
    }]);