'use strict';

var app = angular.module('siApp');

app.factory('User', function (ROLES) {
  var user = {
    roles: []
  };

  return user;
});