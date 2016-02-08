'use strict';

angular.module('siApp')
  .config(['$stateProvider', 'ROLES', function ($stateProvider, ROLES) {
    $stateProvider
      .state('admin.overview', {
        url: '/overview',
        templateUrl: 'admin/overview/overview.html'
      })
      .state('admin.staff', {
        url: '/staff/{type:string}',
        templateUrl: 'admin/staff/staff.html',
        controller: 'StaffCtrl',
        resolve: {
          Entities: ['$stateParams', 'Students', 'Assistants', 'Professors',
            function ($stateParams, StudentService, AssistantService, ProfessorService) {
              if ($stateParams.type === 'students') {
                return angular.extend(StudentService, {staffType: {slug: 'students', title: 'Studenti'}});
              } else if ($stateParams.type === 'professors') {
                return angular.extend(ProfessorService, {staffType: {slug: 'professors', title: 'Profesori'}});
              } else if ($stateParams.type === 'assistants') {
                return angular.extend(AssistantService, {staffType: {slug: 'assistants', title: 'Asistenti'}});
              }
            }]
        }
      });
  }]);