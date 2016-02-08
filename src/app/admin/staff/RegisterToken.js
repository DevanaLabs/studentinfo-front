'use strict';


angular.module('siApp')
  .factory('RegisterToken', ['Api', function (Api) {
    var registerToken = {};

    registerToken.issue = function (emails) {
      return Api.issueRegisterTokens(emails);
    };

    return registerToken;
  }]);