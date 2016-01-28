'use strict';

angular.module('siAdminApp')
  .service('Session', ['$cookies', function ($cookies) {
    var self = this;

    this.load = function () {
      self.id = $cookies.get('session-id');
      self.userId = $cookies.get('session-user-id');
      self.userRole = $cookies.get('session-user-role');
      self.userObject = $cookies.getObject('session-user-object');
      console.log('Session loaded');
      console.log(self);
    };

    this.isInCookies = function () {
      return $cookies.get('session-exists');
    };

    this.create = function (sessionId, userId, userRole, userObject) {
      console.log('Session created');
      self.id = sessionId;
      self.userId = userId;
      self.userRole = userRole;
      self.userObject = userObject;

      $cookies.put('session-exists', true);
      $cookies.putObject('session-user-object', userObject);
      $cookies.put('session-id', sessionId);
      $cookies.put('session-user-id', userId);
      $cookies.put('session-user-role', userRole);
    };

    this.destroy = function () {
      console.log('Session destroyed');
      self.id = null;
      self.userId = null;
      self.userRole = null;
      self.userObject = null;
      $cookies.remove('session-exists');
      $cookies.remove('session-user-object');
      $cookies.remove('session-id');
      $cookies.remove('session-user-id');
      $cookies.remove('session-user-role');
    };
  }]);