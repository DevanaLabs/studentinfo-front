'use strict';

angular.module('siApp.dashboard')
  .controller('NotificationsModalCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'EntityService', 
  function ($rootScope, $scope, $state, $stateParams, $translate, EntityService) {
    $scope.$stateParams = $stateParams;
    $scope.notifications = EntityService.getNotifications($stateParams.sourceId);
    $scope.objectData = EntityService.getById($stateParams.sourceId);
    console.log($scope.objectData);
    if($stateParams.type == 'group') {
      $scope.title = $translate.instant('GROUP') + ' ' + $scope.objectData.name;
    } else if ($stateParams.type == 'teacher') {
      $scope.title = $scope.objectData.firstName + " " + $scope.objectData.lastName;
    } else if ($stateParams.type == 'classroom') {
      $scope.title = $scope.objectData.name;
    }
  }]);
 