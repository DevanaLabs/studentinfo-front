'use strict';

var app = angular.module('siApp');

app.factory('Privilege', function (ROLES, User) {
  var privilege = {};

  privilege.check = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }

    if (_.indexOf(authorizedRoles, ROLES.any) != -1) {
      return true;
    }

    return _.intersection(authorizedRoles, user.roles).length() > 0;
  };

  return privilege;
});