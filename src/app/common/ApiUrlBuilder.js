'use strict';

angular.module('siApp')
  .factory('ApiUrlBuilder', function (API_URL) {
    var urlBuilder = {
      baseEndpoints: ['auth']
    };

    urlBuilder.build = function (resource) {
      if (_.indexOf(urlBuilder.baseEndpoints, resource) != -1) {
        return API_URL + '/' + resource;
      }
      return API_URL + '/raf/' + resource;
    };

    return urlBuilder;
  });