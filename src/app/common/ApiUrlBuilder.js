'use strict';

angular.module('siApp')
  .factory('ApiUrlBuilder', ['$rootScope', 'API_URL', 'EVENTS',
    function ($rootScope, API_URL, EVENTS) {
      var urlBuilder = {
        baseEndpoints: ['auth', 'oauth/access_token', 'register', 'user', 'register/recoverPasswordConfirmation/'],
        slug: ''
      };

      $rootScope.$on(EVENTS.AUTH.FACULTY_CHANGED, function (event, slug) {
        urlBuilder.slug = slug;
      });

      urlBuilder.build = function (resource, params) {
        var getParams = '';
        if (params) {
          getParams = urlBuilder.makeGetParams(params);
        }

        if (
          _.includes(urlBuilder.baseEndpoints, resource) || 
          _.includes(urlBuilder.baseEndpoints, resource.substr(0, resource.indexOf('/'))) 
          ) {
          return API_URL + '/' + resource + getParams;
        }
        return API_URL + '/' + urlBuilder.slug + '/' + resource + getParams;
      };

      urlBuilder.makeGetParams = function (params) {
        var getParams = '?';
        _.forEach(params, function (value, key) {
          getParams += key + '=' + value + '&';
        });
        return getParams.slice(0, -1);
      };

      return urlBuilder;
    }]);