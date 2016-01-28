'use strict';

angular.module('siApp')
  .directive('siSidebar', [function () {
    return {
      scope: '',
      replace: true,
      templateUrl: 'app/components/sidebar/views/sidebar.html',
      link: function (scope, element, attr) {

      }
    };
  }]);