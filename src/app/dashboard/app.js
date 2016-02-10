'use strict';

angular.module('siApp.dashboard', ['ui.router', 'LocalStorageModule', 'siApp.config', 'siApp', 'ui.bootstrap', 'pascalprecht.translate', 'toastr'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('dashboard.preSchedule', {
        url: '/preSchedule',
        templateUrl: 'dashboard/preSchedule/preScheduleBase.html'
      })
      .state('dashboard.preSchedule.groups', {
        url: '/groups',
        templateUrl: 'dashboard/preSchedule/groups/groupsBase.html', 
        controller: 'GroupsCtrl'
      });
  }])
  .constant('LANGUAGE_CONSTANTS', {
    CYRILIC: ['А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш']
  });