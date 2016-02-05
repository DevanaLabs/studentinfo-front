'use strict';

angular.module('siApp.dashboard', ['siApp'])
  .factory("Teachers", ['$scope', 'Dashboard', 'LANGUAGE_CONSTANTS', function ($scope, Dashboard, LANGUAGE_CONSTANTS) {
    var teachersService = {};

    var teachers = Dashboard.getTeachers();
    teachers.sort(function (a, b) {
      return (new Intl.Collator('rs').compare(a.lastName, b.lastName));
    });

    teachersService.getById = function (id) {
      return _.find(teachers, {'id': id});
    };
    teachersService.getShownTeachers = function (year) {
      return _.groupBy(teachers,  function(o) { return o.lastName.substr(0,1); });
    };
    teachersService.getFilters = function () {
      var allTeachers = _.groupBy(teachers,  function(o) { return o.lastName.substr(0,1); });
      var azbuka = LANGUAGE_CONSTANTS.CYRILIC;
      return _.zipObject(azbuka, _.map(azbuka, function(o){ return allTeachers.hasOwnProperty(o); }));
    };


    return teachersService;
  }]);