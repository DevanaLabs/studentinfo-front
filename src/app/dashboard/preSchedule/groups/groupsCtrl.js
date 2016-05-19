'use strict';

angular.module('siApp.dashboard')
  .controller('GroupsCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'GroupsD',
  function ($rootScope, $scope, $state, $stateParams, $translate, GroupsD) {
    // subfilters shown in the filterbar 
    $scope.subfilters = GroupsD.getFilters();

    // currently displayed subfilter, initially set from state parameters, later set from `setSubFilter()`
    $scope.displayedSubfilter = $stateParams.year;

    // return groups of currently displayed year, that are shown
    $scope.groupsForYear = function () {
      return GroupsD.getForYear($scope.displayedSubfilter);
    };

    $scope.setSubfilter = function (year) {
      $scope.displayedSubfilter = year;
      $state.go($state.current, {'year': year});
    };
    
    // if current subfilter has no groups, switch it to the first one that does have groups
    // used so we don't have to hardcode groups/classrooms in the events configuration
    if(GroupsD.getForYear($scope.displayedSubfilter).length === 0) {
      $scope.setSubfilter($scope.subfilters[0]);
    }
  }]);
