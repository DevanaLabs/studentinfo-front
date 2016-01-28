'use strict';

angular.module('siAdminApp')
  .directive('siAdminSidebar', [function () {
    return {
      scope: '',
      replace: true,
      templateUrl: 'components/sidebar/views/view.html',
      controller: 'SidebarCtrl'
    };
  }]);