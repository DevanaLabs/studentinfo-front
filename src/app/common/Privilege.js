'use strict';

angular.module('siApp')
  .factory('Privilege', ['ROLES', 'Auth',
    function (ROLES, Auth) {
      var privilege = {};

      privilege.check = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }

        if (_.includes(authorizedRoles, ROLES.any)) {
          return true;
        }
        if (_.includes(authorizedRoles, ROLES.none)) {
          return (Auth.user().roles.length === 0);
        }

        return _.intersection(authorizedRoles, Auth.user().roles).length > 0;
      };

      privilege.redirectStateBasedOnRole = function () {
        if (privilege.check([ROLES.superAdmin, ROLES.admin])) {
          return 'admin.overview';
        } else {
          return 'dashboard.home';
        }
      };

      return privilege;
    }]);