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
      .state('register', {
        url: '/register',
        data: {
          authorizedRoles: ROLES.none
        },
        templateUrl: 'register/register.html'
      })
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        data: {
          authorizedRoles: ROLES.any
        },
        templateUrl: 'dashboard/index.html',
        controller: 'MainDashboardCtrl'
      })
      .state('admin', {
        url: '/admin',
        abstract: true,
        data: {
          authorizedRoles: [ROLES.admin, ROLES.superAdmin]
        },
        templateUrl: 'admin/index.html',
        controller: 'MainAdminCtrl'
      });
  }]);