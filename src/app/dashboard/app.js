'use strict';

angular.module('siApp.dashboard', ['ui.router', 'LocalStorageModule', 'siApp', 'ui.bootstrap', 'pascalprecht.translate', 'toastr'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('dashboard.home', {
        url: '/'
      })
      .state('dashboard.screensaver', {
        url: '/', 
        controller: ['$state', function($state) {
          $state.go('dashboard.home');
          // $state.go('dashboard.android');
        }]
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
          EntityService: ['$stateParams', 'GroupsD', 'ClassroomsD', 'TeachersD', function ($stateParams, GroupsD, ClassroomsD, TeachersD) {
            if ($stateParams.type === 'group') {
              return GroupsD;
            } else if ($stateParams.type === 'teacher') {
              return TeachersD;
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
          EntityService: ['$stateParams', 'GroupsD', 'ClassroomsD', 'TeachersD', function ($stateParams, GroupsD, ClassroomsD, TeachersD) {
            if ($stateParams.type === 'group') {
              return GroupsD;
            } else if ($stateParams.type === 'teacher') {
              return TeachersD;
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
          EntityService: ['$stateParams', 'GroupsD', 'ClassroomsD', 'TeachersD', function ($stateParams, GroupsD, ClassroomsD, TeachersD) {
            if ($stateParams.type === 'group') {
              return GroupsD;
            } else if ($stateParams.type === 'teacher') {
              return TeachersD;
            } else if ($stateParams.type === 'classroom') {
              return ClassroomsD;
            }
          }]
        }
      })
      .state('dashboard.about', {
        url: '/about/', 
        templateUrl: 'dashboard/about/aboutBase.html',
        controller: 'AboutCtrl',
        data: { transition: 'asdf'}
      })
      .state('dashboard.android', {
        url: '/android/',
        templateUrl: 'dashboard/android/androidBase.html'
      })
      .state('dashboard.poll', {
        url: '/poll/',
        templateUrl: 'dashboard/poll/pollBase.html',
        controller: 'PollCtrl'
      })
      ;
  }])
  .constant('LANGUAGE_CONSTANTS', {
    CYRILIC: ['А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш']
  })
  .constant('LECTURE_TYPES', {
    LECTURE: ['Предавања', 'Предавање', 'Predavanja', 'Predavanje']
  })
  .constant('CLASS_COLOR_MAP', {
    "Испитни рок": "blue",
    "Испит": "blue",
    "Колоквијумска недеља": "orange",
    "Колоквијум": "orange",
    "Нерадни дани": "gray",
    "Плаћање школарине": "green"
  })
  .constant('LECTURE_TYPE_MAP', [
    "DISCOURSE",//"Предавање",
    "EXERCISES",//"Вежбе",
    "DISCOURSE_AND_EXERCISES",//"Предавање и Вежбе",
    "PRACTICUM"//"Практикум"
  ])
  .filter('typeToClass', ['CLASS_COLOR_MAP', function(CLASS_COLOR_MAP) { 
    return function(type) {
      var classMap = CLASS_COLOR_MAP;
      if (classMap[type] === undefined) {
        return "yellow";
      }
      else {
        return classMap[type];
      }
    };
  }])
  .filter('lectureTypeTranslate', ['LECTURE_TYPE_MAP', '$translate', function(LECTURE_TYPE_MAP, $translate) { 
    return function(type) {
      var lectureTypeMap = LECTURE_TYPE_MAP;
      return $translate.instant(lectureTypeMap[type]);
    };
  }])
  ;