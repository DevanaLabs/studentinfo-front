// 'use strict';

// var app = angular.module('siApp');

// app.constant('Events', {
//   AUTH: {
//     LOGIN_SUCCESS: 'si-login-success',
//     LOGIN_FAIL: 'si-login-fail'
//   },
//   API: {
//     GET_DATA_REQUEST_START: 'si-get-data-request-start',
//     GET_DATA_SUCCESS: 'si-get-data-success',
//     GET_DATA_FAIL: 'si-get-data-fail'
//   }
// });

// app.factory('ApiUrlBuilder', ['API_BASE', function (API_BASE) {
//   return {
//     suffix: '',
//     build: function (resource) {
//       return API_BASE + this.suffix  + resource;
//     }
//   }
// }])
//   .run(['$rootScope', 'Events', 'ApiUrlBuilder', function ($rootScope, Events, ApiUrlBuilder) {
//     $rootScope.$on(Events.AUTH.LOGIN_SUCCESS, function (response) {
//       ApiUrlBuilder.suffix = response.data.user.organisation.slug;
//     })
//   }]);

// app.factory('Api', ['$http', 'ApiUrlBuilder', function ($http, ApiUrlBuilder) {
//   return {
//     getData: function () {
//       return $http.get(ApiUrlBuilder.build('/all'));
//     }
//   };
// }])
//   .constant('API_REFRESH', 5000)
//   .run(['$timeout', '$rootScope', 'Events', function ($timeout, $rootScope, Events) {

//     function fetchNewData() {
//       $rootScope.$broadcast(Events.API.GET_DATA_REQUEST_START);
//       Api.getData().then(function (response) {
//         $rootScope.$broadcast(Events.API.GET_DATA_SUCCESS, response);
//       }, function (response) {
//         console.error(response);
//         $rootScope.$broadcast(Events.API.GET_DATA_FAIL, response);
//       });
//     }

//     $timeout(function () {
//       fetchNewData();
//     }, API_REFRESH);

//     fetchNewData();
//   }]);

// app.factory('Dashboard', ['$rootScope', 'Events', function ($rootScope, Events) {
//   var dashboardData = {
//     groups: [],
//     teachers: [],
//     classrooms: [],
//     globalEvents: [],
//     courseEvents: [],
//     groupEvents: []
//   };

//   $rootScope.$on(Events.API.GET_DATA_SUCCESS, function (response) {
//     dashboardData = response.success.data;
//   });

//   return {
//     getGroups: function () {
//       return dashboardData.groups;
//     },
//     getTeachers: function () {
//       return dashboardData.teachers;
//     },
//     getClassrooms: function () {
//       return dashboardData.classrooms;
//     },
//     getGlobalEvents: function () {
//       return dashboardData.globalEvents;
//     },
//     getCourseEvents: function () {
//       return dashboardData.courseEvents;
//     },
//     getGroupEvents: function () {
//       return dashboardData.groupEvents;
//     }
//   };
// }]);