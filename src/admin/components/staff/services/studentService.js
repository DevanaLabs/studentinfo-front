'use strict';

angular.module('siAdminApp')
  .factory('StudentService', ['API', '$resource', function (API, $resource) {

    var actions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 1000
        },
        url: API.url + '/students/:start/:count'
      }
    };

    return $resource(API.url + '/student/:id', {}, actions);
  }]);

