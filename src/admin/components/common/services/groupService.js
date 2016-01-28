'use strict';

angular.module('siAdminApp')
  .factory('GroupService', ['API', '$resource', function (API, $resource) {

    var actions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/groups/:start/:count'
      }
    };

    return $resource(API.url + '/group/:id', {id: "@id"}, actions);
  }]);

