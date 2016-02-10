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
          return $http.post(ApiUrlBuilder.build('oauth/access_token'), credentials, {
            noOAuth2: true
          });
        },
        authUser: function (credentials) {
          return $http.post(ApiUrlBuilder.build('auth'), credentials, {
            noOAuth2: true
          });
        },
        fetchDashboardData: function () {
          return $http.get(ApiUrlBuilder.build('data'));
        },
        logout: function () {
          return $http.delete(ApiUrlBuilder.build('auth'));
        },
        getStudents: function (pagination) {
          return $http.get(ApiUrlBuilder.build('students'), {
            data: {
              start: pagination.start,
              count: pagination.count
            }
          });
        },
        removeStudent: function (id) {
          return $http.delete(ApiUrlBuilder.build('student/' + id));
        },
        getAssistants: function (pagination) {
          return $http.get(ApiUrlBuilder.build('assistants'), {
            data: {
              start: pagination.start,
              count: pagination.count
            }
          });
        },
        removeAssistant: function (id) {
          return $http.delete(ApiUrlBuilder.build('assistant/' + id));
        },
        getProfessors: function (pagination) {
          return $http.get(ApiUrlBuilder.build('professors'), {
            data: {
              start: pagination.start,
              count: pagination.count
            }
          });
        },
        removeProfessor: function (id) {
          return $http.delete(ApiUrlBuilder.build('professor/' + id));
        },
        issueRegisterTokens: function (emails) {
          return $http.post(ApiUrlBuilder.build('register'), {
            emails: emails
          });
        },
        changeUserPassword: function (userId, password) {
          return $http.post(ApiUrlBuilder.build('user') + '/' + userId, {
            password: password.password,
            password_confirmation: password.confirmation
          });
        },
        sendFeedback: function (content) {
          return $http.post(ApiUrlBuilder.build('feedback'), {
            text: content
          });
        }
      };
    }]);