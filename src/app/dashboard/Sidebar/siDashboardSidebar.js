'use strict';

angular.module('siApp')
  .directive('siDashboardSidebar', [function () {
    return {
      scope: '',
      replace: true,
      templateUrl: 'dashboard/sidebar/si-dashboard-sidebar.html'
    };
  }]);