'use strict';

angular.module('siApp.dashboard', ['ui.router', 'LocalStorageModule', 'siApp', 'ui.bootstrap', 'pascalprecht.translate', 'toastr'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('dashboard.home', {
        url: '/'
      })
      .state('dashboard.preSchedule', {
        url: '/preSchedule',
        templateUrl: 'dashboard/preSchedule/preScheduleBase.html'
      })
      .state('dashboard.preSchedule.groups', {
        url: '/groups/{year}/',
        templateUrl: 'dashboard/preSchedule/groups/groupsBase.html', 
        controller: 'GroupsCtrl', 
        params: {
          year: { value: "1" }
        }
      })
      .state('dashboard.preSchedule.classrooms', {
        url: '/classrooms/{floor}/',
        templateUrl: 'dashboard/preSchedule/classrooms/classroomsBase.html', 
        controller: 'ClassroomsCtrl', 
        params: {
          floor: { value: "1" }
        }
      })
      .state('dashboard.preSchedule.teachers', {
        url: '/teachers/',
        templateUrl: 'dashboard/preSchedule/teachers/teachersBase.html', 
        controller: 'TeachersCtrl'
      })
      .state('dashboard.schedule', {
        url: '/schedule/{type}/{id}',
        templateUrl: 'dashboard/schedule/scheduleBase.html', 
        controller: 'ScheduleCtrl',
        resolve: {
          EntityService: ['$stateParams', 'Groups', 'ClassroomsD', 'Teachers', function ($stateParams, Groups, ClassroomsD, Teachers) {
            if ($stateParams.type === 'group') {
              return Groups;
            } else if ($stateParams.type === 'teacher') {
              return Teachers;
            } else if ($stateParams.type === 'classroom') {
              return ClassroomsD;
            }
          }]
        }
      })
      .state('dashboard.yearly', {
        url: '/yearly/',
        templateUrl: 'dashboard/calendar/yearly/yearlyBase.html', 
        controller: 'YearlyCtrl'
      })
      .state('dashboard.monthly', {
        url: '/monthly/{year}/{month}/',
        templateUrl: 'dashboard/calendar/monthly/monthlyBase.html', 
        controller: 'MonthlyCtrl'
      })
      .state('dashboard.day', {
        url: '/day/{year}/{month}/{date}/', 
        templateUrl: 'dashboard/modal/day/modalDay.html',
        controller: 'DayModalCtrl'
      })
      .state('dashboard.lecture', {
        url: '/lecture/{type}/{sourceId}/{lectureId}/', 
        templateUrl: 'dashboard/modal/lecture/modalLecture.html',
        controller: 'LectureModalCtrl',
        resolve: {
          EntityService: ['$stateParams', 'Groups', 'ClassroomsD', 'Teachers', function ($stateParams, Groups, ClassroomsD, Teachers) {
            if ($stateParams.type === 'group') {
              return Groups;
            } else if ($stateParams.type === 'teacher') {
              return Teachers;
            } else if ($stateParams.type === 'classroom') {
              return ClassroomsD;
            }
          }]
        }
      })
      .state('dashboard.notifications', {
        url: '/notifications/{type}/{sourceId}/', 
        templateUrl: 'dashboard/modal/notifications/modalNotifications.html',
        controller: 'NotificationsModalCtrl',
        resolve: {
          EntityService: ['$stateParams', 'Groups', 'ClassroomsD', 'Teachers', function ($stateParams, Groups, ClassroomsD, Teachers) {
            if ($stateParams.type === 'group') {
              return Groups;
            } else if ($stateParams.type === 'teacher') {
              return Teachers;
            } else if ($stateParams.type === 'classroom') {
              return ClassroomsD;
            }
          }]
        }
      })
      .state('dashboard.about', {
        url: '/about/', 
        templateUrl: 'dashboard/about/aboutBase.html',
        controller: 'AboutCtrl'
      })
      ;
  }])
  .constant('LANGUAGE_CONSTANTS', {
    CYRILIC: ['А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш']
  })
  .constant('LECTURE_TYPES', {
    LECTURE: ['Предавања', 'Предавање', 'Predavanja', 'Predavanje']
  })
  ;