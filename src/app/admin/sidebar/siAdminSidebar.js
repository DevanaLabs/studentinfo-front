'use strict';

angular.module('siApp')
  .directive('siAdminSidebar', [function () {
    return {
      scope: '',
      replace: true,
      templateUrl: 'admin/sidebar/si-admin-sidebar.html'
    };
  }]);