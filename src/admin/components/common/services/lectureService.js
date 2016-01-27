'use strict';

angular.module('siAdminApp')
  .factory('LectureService', ['API', '$resource', function (API, $resource) {

    var actions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/lectures/:start/:count'
      }
    };

    return $resource(API.url + '/lectures/:id', {id: "@id"}, actions);
  }]);

