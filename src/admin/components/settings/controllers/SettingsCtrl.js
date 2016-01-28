'use strict';

angular.module('siAdminApp')
  .controller('SettingsCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'SettingsService',
    'toastr',
    'SETTINGS_FAKE_IMAGE',
    function ($scope, $state, $stateParams, SettingsService, toastr, SETTINGS_FAKE_IMAGE) {
      $scope.file = '';
      $scope.currentWallpaper = SETTINGS_FAKE_IMAGE;

      /*
       SettingsService.downloadImage().then(function (response) {
       $scope.currentWallpaper = response.success.data;
       });
       */

      $scope.processForm = function () {
        if ($scope.file) {
          SettingsService.uploadImage($scope.file);
        }
      }
    }]);

angular.module('siAdminApp')
  .constant('SETTINGS_FAKE_IMAGE', 'https://placeholdit.imgix.net/~text?txtsize=42&txt=450%C3%97300&w=450&h=300');