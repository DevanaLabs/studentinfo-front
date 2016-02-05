'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory("Groups", ['$scope', 'Dashboard', function ($scope, Dashboard) {
    var groupsService = {};

    var groups = Dashboard.getGroups();

    groupsService.getById = function (id) {
      return _.find(groups, {'id': id});
    };
    groupsService.getForYear = function (year) {
      return _.values(_.pickBy(groups, {"year": year}));
    };
    groupsService.getFilters = function () {
      return _.uniq( _.map( groups, 'year' ) );
    };


    return groupsService;
  }]);