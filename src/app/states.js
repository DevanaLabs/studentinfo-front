'use strict';

angular.module('siApp')
  .config(['$stateProvider', '$urlRouterProvider', 'ROLES',
    function ($stateProvider, $urlRouterProvider, ROLES) {
      $urlRouterProvider.otherwise('/login');

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
          url: '/register/{registerToken}',
          data: {
            authorizedRoles: ROLES.none
          },
          templateUrl: 'register/register.html',
          controller: 'RegisterCtrl'
        })
        .state('recover', {
          url: '/recover/{recoverToken}',
          data: {
            authorizedRoles: ROLES.none
          },
          templateUrl: 'recover/recover.html',
          controller: 'RecoverCtrl'
        })
        .state('dashboard', {
          url: '/app',
          abstract: true,
          data: {
            authorizedRoles: [ROLES.admin, ROLES.superAdmin, ROLES.student, ROLES.panel]
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