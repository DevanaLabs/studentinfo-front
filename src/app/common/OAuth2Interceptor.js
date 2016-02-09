'use strict';

angular.module('siApp')
  .factory('OAuth2Interceptor', ['$rootScope', '$q', 'ApiUrlBuilder', 'API_URL', 'EVENTS',
    function ($rootScope, $q, ApiUrlBuilder, API_URL, EVENTS) {

      var accessToken = null;

      $rootScope.$on(EVENTS.AUTH.OAUTH2_ACCESS_TOKEN_CHANGED, function (event, authToken) {
        accessToken = authToken;
      });
      return {
        request: function (config) {
          console.warn(config);
          var deferred = $q.defer();
          if (config.noOAuth2 === true) {
            deferred.resolve(config);
          } else if (config.url.indexOf(API_URL) === -1) {
            deferred.resolve(config);
          } else {
            if (config.method === 'GET') {
              if (!config.data) {
                config.data = {};
              }
              config.url +=
                ApiUrlBuilder.makeGetParams(angular.extend(config.data, {access_token: accessToken.access_token}));
            } else {
              config.data.access_token = accessToken.access_token;
            }
            deferred.resolve(config);
          }
          return deferred.promise;
        }
      };
    }]);