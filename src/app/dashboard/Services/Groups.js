'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory('Groups', ['$rootScope', 'Dashboard', 'EVENTS', function ($rootScope, Dashboard, EVENTS) {
    var groupsService = {};

    var groups = Dashboard.getGroups();

    $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      groups = Dashboard.getGroups();
    });

    groupsService.getById = function (id) {
      return _.find(groups, {'id': id});
    };

    groupsService.getForYear = function (year) {
      return _.values(_.pickBy(groups, {'year': year}));
    };

    groupsService.getFilters = function () {
      return _.uniq(_.map(groups, 'year'));
    };

    return groupsService;
  }]);