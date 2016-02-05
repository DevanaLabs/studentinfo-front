'use strict';

angular.module('siApp')
  .factory('ApiUrlBuilder', ['API_URL',
    function (API_URL) {
      var urlBuilder = {
        baseEndpoints: ['auth', 'oauth/access_token'],
        slug: ''
      };

      urlBuilder.build = function (resource) {
        if (_.includes(urlBuilder.baseEndpoints, resource)) {
          return API_URL + '/' + resource;
        }
        return API_URL + '/raf/' + resource;
      };

      return urlBuilder;
    }]);