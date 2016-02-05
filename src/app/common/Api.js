'use strict';

angular.module('siApp')
  .factory('Api', ['$http', 'API_URL', 'ApiUrlBuilder',
    function ($http, API_URL, ApiUrlBuilder) {
      var api = {};

      api.login = function (credentials) {
        return $http.post(ApiUrlBuilder.build('auth'), credentials);
      };
      
      api.fetchDashboardData = function () {
        return $http.get(ApiUrlBuilder.build('data'));
      };
      

      return api;
    }]);