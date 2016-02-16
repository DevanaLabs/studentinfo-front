'use strict';

angular.module('siApp')
  .controller('ImportCtrl', ['$scope', 'toastr', 'Import', 'EVENTS',
    function ($scope, toastr, Import, EVENTS) {

      $scope.canSubmit = true;

      $scope.file = null;

      $scope.types = Import.supportedTypes;
      $scope.importTypeIndex = 0;

      $scope.onSubmit = function () {
        $scope.canSubmit = false;

        var type = $scope.types[$scope.importTypeIndex];

        Import.uploadFile(type, $scope.file).then(function (response) {
          toastr.success('Podaci su importovani!');
        }, function (response) {
          toastr.error(response.data.error.message, 'Greska!');
        }).finally(function () {
          $scope.canSubmit = true;
        });
      };

      $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);

    }]);