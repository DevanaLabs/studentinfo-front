'use strict';

angular.module('siApp')
  .factory('Recover', ['Api', function (Api) {
    var recover = {};

    recover.validatePassword = function (password, confirmation) {
        return (password !== '' && password === confirmation);
    };

    recover.setPassword = function (token, password) {
      return Api.recoverPost(token, {
        password: password.password,
        password_confirmation: password.passwordConfirmation
      });
    };

    return recover;
  }]);