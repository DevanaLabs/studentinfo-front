'use strict';

angular.module('siApp.dashboard')
  .factory('TeachersD', ['$rootScope', 'Dashboard', 'LANGUAGE_CONSTANTS', 'EVENTS',
    function ($rootScope, Dashboard, LANGUAGE_CONSTANTS, EVENTS) {
      var teachersService = {};

      teachersService.sort = function () {
        teachers.sort(function (a, b) {
          return (new Intl.Collator('rs').compare(a.lastName, b.lastName));
        });
      };

      var teachers = [];
      teachers = Dashboard.getTeachers();
      teachersService.sort();

      $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
        // update data and sort it; 
        teachers = Dashboard.getTeachers();
        teachersService.sort();
      });

      teachersService.getById = function (id) {
        return _.find(teachers, {'id': id*1});
      };

      teachersService.getShown = function () {
        return _.groupBy(teachers, function (teacher) {
          return teacher.lastName[0].toUpperCase();
        });
      };

      teachersService.getFilters = function () {
        var allTeachers = _.groupBy(teachers, function (teacher) {
          return teacher.lastName[0];
        });
        var azbuka = LANGUAGE_CONSTANTS.CYRILIC;
        return _.zipObject(azbuka, _.map(azbuka, function (o) {
          return allTeachers.hasOwnProperty(o);
        }));
      };

      teachersService.getLecture = function (teacherId, lectureId) {
        var pickedTeacher = _.find(teachers, function(teacher) {
          return teacher.id == teacherId;
        });
        return _.find(pickedTeacher.lectures, function(lecture){
          return lecture.id == lectureId;
        });
      };

      teachersService.getNotifications = function (teacherId, lectureId) {
        var notifications = [];
        var pickedTeacher = _.find(teachers, function(teacher) {
          return teacher.id == teacherId;
        });
        if(lectureId === undefined) {
          _.forEach(pickedTeacher.lectures, function(lecture){
            _.forEach(lecture.notifications, function(notification){
              notifications.push(notification);
            });
          });
        }
        else {
          var pickedLecture = _.find(pickedTeacher.lectures, function(lecture){
            return lecture.id == lectureId;
          });
          _.forEach(pickedLecture.notifications, function(notification){
            notifications.push(notification);
        });
      }
      return notifications;
    };

      return teachersService;
    }]);