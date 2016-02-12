'use strict';

angular.module('siApp')
  .config(['$stateProvider', '$httpProvider', 'ROLES', function ($stateProvider, $httpProvider, ROLES) {
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

    $stateProvider
      .state('admin.logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      })
      .state('admin.overview', {
        url: '/overview',
        templateUrl: 'admin/overview/overview.html'
      })
      .state('admin.profile', {
        url: '/profile',
        templateUrl: 'admin/profile/edit_profile.html',
        controller: 'ProfileCtrl'
      })
      .state('admin.feedback', {
        url: '/feedback',
        templateUrl: 'admin/feedback/feedback.html',
        controller: 'FeedbackCtrl'
      })
      .state('admin.events', {
        url: '/events/{type:string}',
        templateUrl: 'admin/events/events.html',
        controller: 'EventsCtrl',
        params: {
          type: {value: 'global'}
        },
        resolve: {
          Events: ['$stateParams', 'GroupEvents', 'CourseEvents', 'GlobalEvents',
            function ($stateParams, GroupEvents, CourseEvents, GlobalEvents) {
              if ($stateParams.type === 'group') {
                return angular.extend(GroupEvents, {eventsType: {slug: 'group'}});
              } else if ($stateParams.type === 'course') {
                return angular.extend(CourseEvents, {eventsType: {slug: 'course'}});
              } else if ($stateParams.type === 'global') {
                return angular.extend(GlobalEvents, {eventsType: {slug: 'global'}});
              }
            }]
        }
      })
      .state('admin.event_new', {
        url: '/events/{type:string}/{id}',
        templateUrl: 'admin/events/event.html',
        controller: 'EventCtrl',
        resolve: {
          Event: ['$stateParams', 'GroupEvents', 'CourseEvents', 'GlobalEvents',
            function ($stateParams, GroupEvents, CourseEvents, GlobalEvents) {
              if ($stateParams.type === 'group') {
                return angular.extend(GroupEvents, {eventsType: {slug: 'group'}});
              } else if ($stateParams.type === 'course') {
                return angular.extend(CourseEvents, {eventsType: {slug: 'course'}});
              } else if ($stateParams.type === 'global') {
                return angular.extend(GlobalEvents, {eventsType: {slug: 'global'}});
              }
            }],
          Mode: ['$stateParams', function ($stateParams) {
            return $stateParams.id != '' ? 'UPDATE' : 'CREATE';
          }]
        }
      })
      .state('admin.staff', {
        url: '/staff/{type:string}',
        templateUrl: 'admin/staff/staff.html',
        controller: 'StaffCtrl',
        resolve: {
          Entities: ['$stateParams', 'Students', 'Assistants', 'Professors',
            function ($stateParams, StudentService, AssistantService, ProfessorService) {
              if ($stateParams.type === 'students') {
                return angular.extend(StudentService, {staffType: {slug: 'students'}});
              } else if ($stateParams.type === 'professors') {
                return angular.extend(ProfessorService, {staffType: {slug: 'professors'}});
              } else if ($stateParams.type === 'assistants') {
                return angular.extend(AssistantService, {staffType: {slug: 'assistants'}});
              }
            }]
        }
      });
  }])
  .run([function () {
    moment.locale('sr-cyr');
  }]);