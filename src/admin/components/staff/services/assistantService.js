'use strict';

angular.module('siAdminApp')
  .factory('AssistantService', ['API', '$resource', function (API, $resource) {

    var actions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/assistants/:start/:count'
      }
    };

    return $resource(API.url + '/assistant/:id', {}, actions);
  }]);

