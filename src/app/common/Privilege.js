'use strict';

angular.module('siApp')
  .factory('Privilege', function (ROLES, Auth) {
    var privilege = {};

    privilege.check = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      if (_.indexOf(authorizedRoles, ROLES.any) !== -1) {
        return true;
      }

      if (_.indexOf(authorizedRoles, ROLES.none) !== -1) {
        return (Auth.user().roles.length === 0);
      }
      console.log(authorizedRoles);
      return _.intersection(authorizedRoles, Auth.user().roles).length > 0;
    };

    return privilege;
  });