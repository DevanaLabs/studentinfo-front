'use strict';

angular.module('siApp.dashboard', ['ui.router', 'LocalStorageModule', 'siApp.config', 'siApp', 'ui.bootstrap', 'pascalprecht.translate', 'toastr'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
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
          EntityService: ['$stateParams', 'Groups', 'Classrooms', 'Teachers', function ($stateParams, Groups, Classrooms, Teachers) {
            if ($stateParams.type === 'groups') {
              return Groups;
            } else if ($stateParams.type === 'teachers') {
              return Teachers;
            } else if ($stateParams.type === 'classrooms') {
              return Classrooms;
            }
          }]
        }
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