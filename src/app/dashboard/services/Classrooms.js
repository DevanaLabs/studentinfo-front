'use strict';

angular.module('siApp.dashboard')
  .factory('ClassroomsD', ['$rootScope', 'Dashboard', 'EVENTS', function ($rootScope, Dashboard, EVENTS) {
    var classroomsService = {};

    var classrooms = Dashboard.getClassrooms();

    $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      classrooms = Dashboard.getClassrooms();
    });

    classroomsService.getById = function (id) {
      return _.find(classrooms, {'id': id*1});
    };

    classroomsService.getForFloor = function (floor) {
      return _.values(_.pickBy(classrooms, {'floor': floor*1}));
    };

    classroomsService.getFilters = function () {
      return _.uniq(_.map(classrooms, 'floor'));
    };

    classroomsService.getLecture = function (classroomId, lectureId) {
      var pickedClassroom = _.find(classrooms, function(classroom) {
        return classroom.id == classroomId;
      });
      return _.find(pickedClassroom.lectures, function(lecture){
        return lecture.id == lectureId;
      });
    };
    
    classroomsService.getNotifications = function (classroomId, lectureId) {
      var notifications = [];
      var pickedClassroom = _.find(classrooms, function(classroom) {
        return classroom.id == classroomId;
      });
      if(lectureId === undefined) {
        _.forEach(pickedClassroom.lectures, function(lecture){
          _.forEach(lecture.notifications, function(notification){
            notifications.push(notification);
          });
        });
      }
      else {
        var pickedLecture = _.find(pickedClassroom.lectures, function(lecture){
          return lecture.id == lectureId;
        });
        _.forEach(pickedLecture.notifications, function(notification){
          notifications.push(notification);
        });
      }
      return notifications;
    };

    return classroomsService;
  }]);