'use strict';

angular.module('siApp')
  .factory('Error', ['toastr', '$translate', 'SERVER_ERRORS', function (toastr, $translate, SERVER_ERRORS) {
    var error = {};

    error.httpError = function (response) {
      if (response.data && response.data.error) {
        var data = (response.data.error.data) ? response.data.error.data : '';
        error.error($translate.instant(SERVER_ERRORS[response.data.error.errorCode]) + '\n' + data);
      } else {
        error.error($translate.instant('UNDEFINED_ERROR'));
      }
    };

    error.error = function (reason) {
      toastr.error($translate.instant(reason), $translate.instant('ERROR'));
    };

    error.warning = function (reason) {
      toastr.warning($translate.instant(reason), $translate.instant('ERROR'));
    };

    error.success = function (what) {
      toastr.success($translate.instant(what), $translate.instant('SUCCESS'));
    };

    error.report = function (reason) {
      // Http request that reports the reason to the server
    };

    return error;
  }]);