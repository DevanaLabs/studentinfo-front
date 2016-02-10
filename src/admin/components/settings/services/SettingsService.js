'use strict';

angular.module('siAdminApp')
  .service('SettingsService', ['$http', 'API', 'Upload', function ($http, API, Upload) {
    return {
      uploadImage: function (file) {
        Upload.upload({
          url: 'http://api.studentinfo.dev/raf/wallpaper',
          data: {'import': file}
        }).then(function (response) {
          toastr.success('Success');
        }, function (response) {
          console.error(response);
          toastr.error('Greska prilikom promene pozadine');
        });
      },
      downloadImage: function () {
        return $http.get('https://placeholdit.imgix.net/~text?txtsize=12&txt=450%C3%97300&w=450&h=300');
      }
    };
  }]);
