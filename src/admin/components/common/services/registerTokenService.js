'use strict';

angular.module('siAdminApp')
  .factory('RegisterTokenService', ['API', '$resource', function (API, $resource) {

    var actions = {
      sendInvitation: {
        method: 'POST',
        params: {
          emails: []
        },
        url: API.url + '/register'
      }
    };

    return $resource(API.url + '/register', {}, actions);
  }]);

