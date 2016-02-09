'use strict';

angular.module('siApp.dashboard')
  .controller('GroupsCtrl', ['$rootScope', '$scope', '$state', '$translate', 'Groups', 
  function ($rootScope, $scope, $state, $translate, Groups) {
    $scope.subfilters = Groups.getFilters();
  }]);
 