'use strict';

angular.module('siAdminApp')
  .controller('ImportCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'API',
    'Upload',
    function ($scope, $state, $stateParams, API, Upload) {
      var self = this;
      $scope.formData = {};
      $scope.formValid = false;
      $scope.typeFromUrl = false;
      $scope.file = '';

      $scope.types = [
        {id: 0, slug: 'students', name: 'Studenti'},
        {id: 1, slug: 'professors', name: 'Profesori'},
        {id: 2, slug: 'classrooms', name: 'Ucionice'},
        {id: 3, slug: 'courses', name: 'Kursevi'},
        {id: 4, slug: 'assistants', name: 'Asistenti'},
        {id: 5, slug: 'lecture', name: 'Raspored'}
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
        Upload.upload({
          url: 'http://api.studentinfo.dev/raf/import' + self.capitalize($scope.types[$scope.importType].slug),
          data: {'import': $scope.file}
        }).then(function (response) {
          toastr.success('Uspesno importovani podaci');
        }, function (response) {
          console.error(response);
          toastr.error('Greska prilikom importa podataka');
        });
      }

      this.capitalize = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }]);