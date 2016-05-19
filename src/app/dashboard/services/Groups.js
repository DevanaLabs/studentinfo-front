'use strict';

angular.module('siApp.dashboard')
  .factory('GroupsD', ['$rootScope', 'Dashboard', 'EVENTS', function ($rootScope, Dashboard, EVENTS) {
      console.log('good groups service loaded');
    var groupsService = {};

    var groups = Dashboard.getGroups();

    $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      groups = Dashboard.getGroups();
    });

    groupsService.getById = function (id) {
      return _.find(groups, {'id': id*1});
    };

    groupsService.getForYear = function (year) {
      return _.sortBy(_.values(_.pickBy(groups, {'year': year*1})), function(group) { return group.name; });

    };

    groupsService.getFilters = function () {
      return _.uniq(_.map(groups, 'year'));
    };

    groupsService.getLecture = function (groupId, lectureId) {
      var pickedGroup = _.find(groups, function(group) {
        return group.id == groupId;
      });
      return _.find(pickedGroup.lectures, function(lecture){
        return lecture.id == lectureId;
      });
    };

    groupsService.getNotifications = function (groupId, lectureId) {
      var notifications = [];
      var pickedGroup = _.find(groups, function(group) {
        return group.id == groupId;
      });
      if(lectureId === undefined) {
        _.forEach(pickedGroup.lectures, function(lecture){
          _.forEach(lecture.notifications, function(notification){
            notifications.push(notification);
          });
        });
      }
      else {
        var pickedLecture = _.find(pickedGroup.lectures, function(lecture){
          return lecture.id == lectureId;
        });
        _.forEach(pickedLecture.notifications, function(notification){
          notifications.push(notification);
        });
      }
      return notifications;
    };

    return groupsService;
  }]);