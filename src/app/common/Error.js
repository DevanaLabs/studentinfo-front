'use strict';

angular.module('siApp')
  .factory(['toastr', '$translate', function (toastr, $translate) {
    var error = {};

    error.httpError = function (response) {
      if (response.data && response.data.error) {
        error.error(response.data.error.message);
      } else {
        error.error($translate.instant('SOMETHING_HAPPENED'));
      }
    };

    error.error = function (reason) {
      toastr.error(reason, $translate.instant('ERROR'));
    };

    error.warning = function (reason) {
      toastr.warning(reason, $translate.instant('ERROR'));
    }

    error.report = function (reason) {
      // Http request that reports the reason to the server
    };

    return error;
  }]);