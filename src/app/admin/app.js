'use strict';

angular.module('siApp')
  .config(['$stateProvider', 'ROLES', function ($stateProvider, ROLES) {
    $stateProvider
      .state('admin.overview', {
        url: '/overview',
        templateUrl: 'admin/overview/overview.html'
      });
  }]);