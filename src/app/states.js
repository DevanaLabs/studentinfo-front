'use strict';

angular.module('siApp')
  .config(['$stateProvider', 'ROLES', function ($stateProvider, ROLES) {
    $stateProvider
      .state('login', {
        url: '/login',
        data: {
          authorizedRoles: ROLES.none
        },
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        data: {
          authorizedRoles: ROLES.any
        }
      })
      .state('admin', {
        url: '/admin',
        abstract: true,
        data: {
          authorizedRoles: [ROLES.admin, ROLES.superAdmin]
        }
      });
  }]);