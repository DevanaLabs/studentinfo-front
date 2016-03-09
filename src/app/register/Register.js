'use strict';

angular.module('siApp')
  .factory('Register', ['Api', function (Api) {
    var register = {};

    register.validatePassword = function (password, confirmation) {
      return (password !== '' && password === confirmation);
    };

    register.getUser = function (registerToken) {
      return Api.registerGet(registerToken);
    };

    register.registerUser = function (token, password) {
      return Api.registerPost(token, {
        password: password.password,
        password_confirmation: password.passwordConfirmation
      });
    };

    return register;
  }]);