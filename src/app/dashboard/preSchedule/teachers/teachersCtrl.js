'use strict';

angular.module('siApp.dashboard')
  .controller('TeachersCtrl', ['$rootScope', '$scope', '$state', '$translate', 'Teachers', 
  function ($rootScope, $scope, $state, $translate, Teachers) {
    $scope.subfilters = Teachers.getFilters();

    $scope.allTeachers = Teachers.getShown();
    console.log($scope.allTeachers);

  }]);
 