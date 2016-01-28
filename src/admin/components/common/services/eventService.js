'use strict';

angular.module('siAdminApp')
  .factory('EventService', ['API', '$resource', function (API, $resource) {

    var genericActions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/events/:start/:count'
      },
      update: {
        method: 'PUT'
      }
    };

    var globalEventActions = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/events/:start/:count'
      },
      update: {
        method: 'PUT'
      }
    };

    return {
      types: [
        {
          id: 0,
          name: "Globalni dogadjaj"
        },
        {
          id: 1,
          name: "Dogadjaj za kurs"
        },
        {
          id: 2,
          name: "Dogadjaj za grupu"
        }
      ],
      generic: $resource(API.url + '/event/:id', {}, genericActions),
      globalEvent: $resource(API.url + '/globalEvent/:id', {}, globalEventActions),
      groupEvent: $resource(API.url + '/groupEvent/:id', {}, {update: {method: 'PUT'}}),
      courseEvent: $resource(API.url + '/courseEvent/:id', {}, {update: {method: 'PUT'}})
    };
  }]);

