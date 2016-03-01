'use strict';

angular.module('siApp')
  .controller('ImportCtrl', ['$scope', 'Error', 'Import', 'EVENTS',
    function ($scope, Error, Import, EVENTS) {

      $scope.canSubmit = true;

      $scope.file = null;

      $scope.types = Import.supportedTypes;
      $scope.importTypeIndex = 0;

      $scope.onSubmit = function () {
        $scope.canSubmit = false;

        var type = $scope.types[$scope.importTypeIndex];

        Import.uploadFile(type, $scope.file).then(function (response) {
          Error.success('DATA_IMPORT_SUCCESS');
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.canSubmit = true;
        });
      };

      $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);

    }]);