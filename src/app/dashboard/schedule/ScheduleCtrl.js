'use strict';

angular.module('siApp.dashboard')
  .controller('ScheduleCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$translate', 'EntityService', 'LECTURE_TYPES', 
  function ($rootScope, $scope, $state, $stateParams, $translate, EntityService, LECTURE_TYPES) {
  	$scope.params = $stateParams;
    $scope.LECTURE_TYPES = LECTURE_TYPES;

    // get group/classroom/teacher object with lectures
    $scope.timetableObject = EntityService.getById($stateParams.id);
    //console.log('All data for timetable', $scope.timetableObject);

    $scope.notifs = 0;
    // count total notificatins in all lectures displayed
    for(var i = 0; i< $scope.timetableObject.lectures; i++) 
      $scope.notifs += $scope.timetableObject.lectures[i].notifications.length;

    // group by days 
    $scope.timetableData = _.groupBy($scope.timetableObject.lectures, function (lecture) {
      return Math.floor(lecture.time.startsAt/86400);
    });

    // mark column as today 
    angular.element(".day" + moment().isoWeekday()).addClass("today");

    $scope.timeMarker = (moment().hours() - 9 + moment().minutes()/60) * 100;
    //$scope.timeMarker = (19 - 9 + 10/60) * 100;

  }])
  .filter('startFrom', function() {
      return function(input, start) {
          start = +start; //parse to int
          return input.slice(start);
      }
  });
 