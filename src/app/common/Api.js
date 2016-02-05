'use strict';

angular.module('siApp')
  .factory('Api', ['$http', 'API_URL', 'ApiUrlBuilder',
    function ($http, API_URL, ApiUrlBuilder) {
      var access_token = null;

      return {
        login: function (credentials) {
          return $http.post(ApiUrlBuilder.build('auth'), credentials);
        },
        fetchDashboardData: function () {
          return $http.get(ApiUrlBuilder.build('data'));
        },
        logout: function () {
          return $http.delete(ApiUrlBuilder.build('auth'));
        }
      };
    }]);