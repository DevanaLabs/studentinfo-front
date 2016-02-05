'use strict';

angular.module('siApp')
  .factory('Api', ['$rootScope', '$http', 'API_URL', 'ApiUrlBuilder', 'EVENTS',
    function ($rootScope, $http, API_URL, ApiUrlBuilder, EVENTS) {
      var accessToken = null;

      $rootScope.$on(EVENTS.AUTH.OAUTH2_ACCESS_TOKEN_CHANGED, function (event, authToken) {
        accessToken = authToken;
      });

      return {
        login: function (credentials) {
          return $http.post(ApiUrlBuilder.build('oauth/access_token'), credentials);
        },
        authUser: function (credentials) {
          return $http.post(ApiUrlBuilder.build('auth'), credentials);
        },
        fetchDashboardData: function () {
          return $http.get(ApiUrlBuilder.build('data', {
            access_token: accessToken.access_token
          }));
        },
        logout: function () {
          return $http.delete(ApiUrlBuilder.build('auth'));
        }
      };
    }]);