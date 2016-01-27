'use strict';

angular.module('siAdminApp')
  .factory('ProfessorService', ['API', '$resource', function (API, $resource) {

    var actions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/professors/:start/:count'
      }
    };

    return $resource(API.url + '/professor/:id', {}, actions);
  }]);

