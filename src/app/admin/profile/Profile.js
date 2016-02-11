'use strict';

angular.module('siApp')
  .factory('Profile', ['Api', function (Api) {
    var profile = {};

    profile.changePassword = function (userId, password) {
      return Api.changeUserPassword(userId, password);
    };

    return profile;
  }]);