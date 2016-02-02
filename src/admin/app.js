'use strict';

var app = angular.module('siAdminApp', [
  'ngResource',
  'ngCookies',
  'ngAnimate',
  'toastr',
  'angularMoment',
  'ui.router',
  'ui.bootstrap',
  'ui-notification',
  'ui.bootstrap.datetimepicker']);
app
  .config([
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider',
    'toastrConfig',
    function ($httpProvider, $stateProvider, $urlRouteProvider, toastrConfig) {

      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
      $httpProvider.defaults.withCredentials = true;
      //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

      angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 5,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      });

      $stateProvider
        //.state('login', {
        //  url: '/login',
        //  templateUrl: 'components/login/views/view.html',
        //  controller: 'LoginCtrl',
        //  data: {
        //    authorizedRoles: ['*']
        //  }
        //})
        .state('home', {
          url: '/home',
          templateUrl: 'components/home/views/view.html',
          controller: 'HomeCtrl',
          data: {
            authorizedRoles: 'admin'
          }
        })
        .state('events', {
          url: '/events',
          templateUrl: 'components/events/views/list.html',
          controller: 'EventsCtrl',
          data: {
            authorizedRoles: 'admin'
          }
        })
        .state('event_new', {
          url: '/events/new',
          templateUrl: 'components/events/views/single_new.html',
          controller: 'NewEventCtrl',
          data: {
            authorizedRoles: 'admin'
          },
          controllerAs: 'vm'
        })
        .state('event', {
          url: '/events/{id:int}/edit',
          templateUrl: 'components/events/views/single_edit.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'EditEventCtrl',
          controllerAs: 'vm'
        })
        .state('lectureNotifications', {
          url: '/lectureNotifications',
          templateUrl: 'components/notifications/views/lectureNotifications/list.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'LectureNotificationsCtrl'
        })
        .state('lectureNotification_new', {
          url: '/lectureNotifications/new/{lecture:int}',
          templateUrl: 'components/notifications/views/lectureNotifications/single_new.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'NewLectureNotificationCtrl',
          controllerAs: 'vm'
        })
        .state('lectureNotification_edit', {
          url: '/lectureNotifications/{id:int}/edit',
          templateUrl: 'components/notifications/views/lectureNotifications/single_edit.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'EditLectureNotificationCtrl',
          controllerAs: 'vm'
        })
        .state('eventNotifications', {
          url: '/eventNotifications',
          templateUrl: 'components/notifications/views/eventNotifications/list.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'EventNotificationsCtrl'
        })
        .state('eventNotification_new', {
          url: '/eventNotifications/new/{event:int}',
          templateUrl: 'components/notifications/views/eventNotifications/single_new.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'NewEventNotificationCtrl',
          controllerAs: 'vm'
        })
        .state('eventNotifications_event', {
          url: '/eventNotifications/event/{id:int}',
          templateUrl: 'components/notifications/views/eventNotifications/list.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'EventNotificationsCtrl'
        })
        .state('import', {
          url: '/import/:importType',
          templateUrl: 'components/import/views/form.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'ImportCtrl',
          controllerAs: 'vm'
        })
        .state('staff', {
          url: '/staff/{type:string}',
          templateUrl: 'components/staff/views/list.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'StaffCtrl',
          resolve: {
            EntityService: function ($stateParams, StudentService, AssistantService, ProfessorService) {
              if ($stateParams.type === 'students') {
                return angular.extend(StudentService, {type: {slug: 'students', title: 'Studenti'}});
              } else if ($stateParams.type === 'professors') {
                return angular.extend(ProfessorService, {type: {slug: 'professors', title: 'Profesori'}});
              } else if ($stateParams.type === 'assistants') {
                return angular.extend(AssistantService, {type: {slug: 'assistants', title: 'Asistenti'}});
              }
            }
          }
        })
        .state('changePassword', {
          url: '/password',
          templateUrl: 'components/admin/views/edit_password.html',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'AdminCtrl'
        })
        //.state('settings', {
        //  url: '/settings',
        //  templateUrl: 'components/settings/views/form.html',
        //  data: {
        //    authorizedRoles: 'admin'
        //  },
        //  controller: 'SettingsCtrl'
        //})
        .state('logout', {
          url: '/logout',
          template: '<h2>logging out</h2>',
          data: {
            authorizedRoles: 'admin'
          },
          controller: 'LogoutCtrl'
        });
    }]);

app
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFail: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  });

app
  .constant('USER_ROLES', {
    all: '*',
    superAdmin: 'super-admin',
    admin: 'admin'
  });

app
  .constant('API', {
    url: 'http://api.studentinfo.dev/raf',
    url_base: 'http://api.studentinfo.dev'
  });

app
  .run(['$rootScope', '$cookies', '$state', '$http', 'AUTH_EVENTS', 'AuthService',
    'Session', 'amMoment', function ($rootScope, $cookies, $state, $http, AUTH_EVENTS, AuthService, Session, amMoment) {
      amMoment.changeLocale('sr');

      if (Session.isInCookies()) {
        Session.load();
        console.log('Found session in cookies');
        $http.defaults.withCredentials = true;
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $rootScope.globals = {
          loggedIn: true,
          currentUser: Session.userObject
        };
      }

      $rootScope.$on('$stateChangeStart', function (event, next) {
        console.log('stateChangeStart event handler');
        var authorizedRoles = next.data.authorizedRoles;

        console.log('Next route');
        console.log(next);

        if (Session.isInCookies()) {
          Session.load();
          console.log('Found session in cookies');
          $http.defaults.withCredentials = true;
          $rootScope.globals = {
            loggedIn: true,
            currentUser: Session.userObject
          };
        }

        //if (next.name === 'login') {
        //  console.log('Next route is login');
        //  return;
        //}

        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            // user is not allowed
            console.log('emit notAuthorized');
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            console.log('emit notAuthenticated');
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
      });
    }]);