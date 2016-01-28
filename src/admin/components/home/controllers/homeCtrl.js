'use strict';

angular.module('siAdminApp')
  .controller('HomeCtrl', [
    '$scope',
    '$http',
    'AuthService',
    'toastr',
    function ($scope, $http, AuthService, toastr) {
      toastr.success('Dobrodosli!');
    }
  ]);