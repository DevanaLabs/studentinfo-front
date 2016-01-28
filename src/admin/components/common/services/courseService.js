'use strict';

angular.module('siAdminApp')
  .factory('CourseService', ['API', '$resource', function (API, $resource) {

    var actions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/courses/:start/:count'
      }
    };

    return $resource(API.url + '/course/:id', {id: "@id"}, actions);
  }]);

