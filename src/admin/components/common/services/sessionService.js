'use strict';

angular.module('siAdminApp')
  .service('Session', ['$cookies', function ($cookies) {
    var self = this;

    this.load = function () {
      self.userObject = $cookies.getObject('session-user-object');
      self.exists = $cookies.get('session-exists');
      console.log('Session loaded');
      console.log(self);
    };

    this.isInCookies = function () {
      return $cookies.get('session-exists');
    };

    this.create = function (userObject) {
      console.log('Session created');
      self.userObject = userObject;
      $cookies.put('session-exists', true);
      $cookies.putObject('session-user-object', userObject);
    };

    this.destroy = function () {
      console.log('Session destroyed');
      self.userObject = null;
      $cookies.remove('session-exists');
      $cookies.remove('session-user-object');
    };
  }]);