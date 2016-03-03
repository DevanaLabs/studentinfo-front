'use strict';

angular.module('siApp.dashboard')
  .controller('ClassroomsCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'ClassroomsD', 
  function ($rootScope, $scope, $state, $stateParams, $translate, Classrooms) {
  	// subfilters shown in the filterbar 
    $scope.subfilters = Classrooms.getFilters();

    // currently displayed subfilter, initially set from state parameters, later set from `setSubFilter()`
    $scope.displayedSubfilter = $stateParams.floor;

    // return classrooms of currently displayed floor, that are shown
    $scope.classroomsForFloor = function () {
      return Classrooms.getForFloor($scope.displayedSubfilter);
    };

    $scope.setSubfilter = function (floor) {
      $scope.displayedSubfilter = floor;
      $state.go($state.current, {'floor': floor});
    };
    
    // if current subfilter has no classrooms, switch it to the first one that does have groups
    // used so we don't have to hardcode groups/classrooms in the events configuration
    if(Classrooms.getForFloor($scope.displayedSubfilter).length === 0) {
      $scope.setSubfilter($scope.subfilters[0]);
    }
  }]);
 