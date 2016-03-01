'use strict';

angular.module('siApp')
  .factory('Error', ['toastr', '$translate', 'SERVER_ERRORS', function (toastr, $translate, SERVER_ERRORS) {
    var error = {};

    error.httpError = function (response) {
      if (response.data && response.data.error) {
        error.error(SERVER_ERRORS[response.data.error.errorCode]);
      } else {
        error.error($translate.instant('SOMETHING_HAPPENED'));
      }
    };

    error.error = function (reason) {
      toastr.error(reason, $translate.instant('ERROR'));
    };

    error.warning = function (reason) {
      toastr.warning(reason, $translate.instant('ERROR'));
    };

    error.success = function (what) {
      toastr.success(what, $translate.instant('SUCCESS'));
    };

    error.report = function (reason) {
      // Http request that reports the reason to the server
    };

    return error;
  }]);