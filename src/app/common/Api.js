'use strict';

angular.module('siApp')
  .factory('Api', function ($http, API_URL, ApiUrlBuilder) {
    return {
      login: function (credentials) {
        return $http.post(ApiUrlBuilder.build('auth'), credentials);
      },
      fetchDashboardData: function () {
        return $http.get(ApiUrlBuilder.build('data'));
      }
    };
  });