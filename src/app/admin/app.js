'use strict';

angular.module('siApp')
  .config(['$stateProvider', '$httpProvider', 'toastrConfig', 'ROLES',
    function ($stateProvider, $httpProvider, toastrConfig, ROLES) {
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

      angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 5,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',
        timeOut: 10000,
        closeButton: true,
        progressBar: true
      });

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
        .state('admin.faculty', {
          url: '/faculty',
          templateUrl: 'admin/faculty/faculty.html',
          controller: 'FacultyCtrl'
        })
        .state('admin.feedback', {
          url: '/feedback',
          templateUrl: 'admin/feedback/feedback.html',
          controller: 'FeedbackCtrl'
        })
        .state('admin.courses', {
          url: '/courses',
          templateUrl: 'admin/courses/courses.html',
          controller: 'CoursesCtrlAdmin'
        })
        .state('admin.course_new', {
          url: '/courses/{id}',
          templateUrl: 'admin/courses/course.html',
          controller: 'CourseCtrlAdmin',
          resolve: {
            Mode: ['$stateParams', function ($stateParams) {
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
            }]
          }
        })
        .state('admin.groups', {
          url: '/groups',
          templateUrl: 'admin/groups/groups.html',
          controller: 'GroupsCtrlAdmin'
        })
        .state('admin.group_new', {
          url: '/groups/{id}',
          templateUrl: 'admin/groups/group.html',
          controller: 'GroupCtrlAdmin',
          resolve: {
            Mode: ['$stateParams', function ($stateParams) {
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
            }]
          }
        })
        .state('admin.classrooms', {
          url: '/classrooms',
          templateUrl: 'admin/classrooms/classrooms.html',
          controller: 'ClassroomsCtrlAdmin'
        })
        .state('admin.classroom_new', {
          url: '/classrooms/{id}',
          templateUrl: 'admin/classrooms/classroom.html',
          controller: 'ClassroomCtrlAdmin',
          resolve: {
            Mode: ['$stateParams', function ($stateParams) {
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
            }]
          }
        })
        .state('admin.import', {
          url: '/import',
          templateUrl: 'admin/import/import.html',
          controller: 'ImportCtrl'
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
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
            }]
          }
        })
        .state('admin.lectures', {
          url: '/lectures',
          templateUrl: 'admin/lectures/lectures.html',
          controller: 'LecturesCtrl'
        })
        .state('admin.lecture_new', {
          url: '/lectures/{id}',
          templateUrl: 'admin/lectures/lecture.html',
          controller: 'LectureCtrl',
          resolve: {
            Mode: ['$stateParams', function ($stateParams) {
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
            }]
          }
        })
        .state('admin.notifications', {
          url: '/notifications/{type:string}/{relatedEntityId}',
          templateUrl: 'admin/notifications/notifications.html',
          controller: 'NotificationsCtrl',
          resolve: {
            Notifications: ['$stateParams', 'LectureNotifications', 'EventNotifications',
              function ($stateParams, LectureNotifications, EventNotifications) {
                if ($stateParams.type === 'lectures') {
                  return angular.extend(LectureNotifications, {notificationsType: {slug: 'lectures'}});
                } else if ($stateParams.type === 'events') {
                  return angular.extend(EventNotifications, {notificationsType: {slug: 'events'}});
                }
              }]
          }
        })
        .state('admin.eventNotification_new', {
          url: '/notifications/events/{relatedEntityId}/{id}',
          templateUrl: 'admin/notifications/eventNotification.html',
          controller: 'EventNotificationCtrl',
          resolve: {
            Mode: ['$stateParams', function ($stateParams) {
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
            }]
          }
        })
        .state('admin.lectureNotification_new', {
          url: '/notifications/lectures/{relatedEntityId}/{id}',
          templateUrl: 'admin/notifications/lectureNotification.html',
          controller: 'LectureNotificationCtrl',
          resolve: {
            Mode: ['$stateParams', function ($stateParams) {
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
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
        })
        .state('admin.staff_new', {
          url: '/staff/{type:string}/{id}',
          templateUrl: 'admin/staff/new_staff.html',
          controller: 'NewStaffCtrl',
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
              }],
            Mode: ['$stateParams', function ($stateParams) {
              return $stateParams.id !== '' ? 'UPDATE' : 'CREATE';
            }]
          }
        });
    }])
  .run(['$rootScope', 'EVENTS', function ($rootScope, EVENTS) {
    $rootScope.$emit(EVENTS.UI.SHOW_LOADING_SCREEN);
    moment.locale('sr-cyr');
  }]);