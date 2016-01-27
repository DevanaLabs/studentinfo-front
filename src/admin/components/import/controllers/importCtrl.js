'use strict';

angular.module('siAdminApp')
  .controller('ImportCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'API',
    function ($scope, $state, $stateParams, API) {
      $scope.formData = {};
      $scope.formValid = false;
      $scope.typeFromUrl = false;
      $scope.acceptTypes = 'image/*';
      $scope.uploadUrl = 'http://api.studentinfo.dev' + '/wallpaper';

      $scope.types = [
        {id: 0, slug: 'students', name: 'Studenti'},
        {id: 1, slug: 'professors', name: 'Profesori'},
        {id: 2, slug: 'classrooms', name: 'Ucionice'},
        {id: 3, slug: 'courses', name: 'Kursevi'},
        {id: 4, slug: 'assistants', name: 'Asistenti'},
      ];

      if ($stateParams.importType.length) {
        var index = _.findIndex($scope.types, function (type) {
          return (type.slug == $stateParams.importType);
        });
        if (index === -1) {
          $state.go('home');
        }
        $scope.formData.type = $scope.types[index];
        $scope.typeFromUrl = true;
      }

      $scope.processForm = function () {

      }
    }]);