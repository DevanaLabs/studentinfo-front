'use strict';

angular.module('siApp.dashboard')
  .directive('siDashboardSidebar', [function () {
    return {
      scope: '',
      replace: true,
      templateUrl: 'dashboard/sidebar/si-dashboard-sidebar.html'
    };
  }]);