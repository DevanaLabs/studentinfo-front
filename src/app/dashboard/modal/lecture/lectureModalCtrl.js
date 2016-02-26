'use strict';

angular.module('siApp.dashboard')
  .controller('LectureModalCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'EntityService', 
  function ($rootScope, $scope, $state, $stateParams, $translate, EntityService) {
    $scope.$stateParams = $stateParams;
    $scope.notifications = EntityService.getNotifications($stateParams.sourceId, $stateParams.lectureId);
    $scope.lectureData = EntityService.getLecture($stateParams.sourceId, $stateParams.lectureId);
    $scope.title = $scope.lectureData.course.name;
    var startsAt = moment().day(1).hour(0).minute(0).second(0).add($scope.lectureData.time.startsAt, 'seconds');
    var endsAt = moment().day(1).hour(0).minute(0).second(0).add($scope.lectureData.time.endsAt, 'seconds');
    var lenght = endsAt.hours() - startsAt.hours();
    $scope.lectureTime = startsAt.format('dddd, HH:mm-') + endsAt.format('HH:mm') + ' ('+lenght+'h)';
  }]);
 