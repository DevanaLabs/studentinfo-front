'use strict';

angular.module('siAdminApp')
  .factory('AdminService', ['API', '$resource', function (API, $resource) {
    return $resource(API.url_base + '/user/:id', {id: "@id"}, {
      updatePassword: {
        method: 'POST'
      }
    });
  }]);

