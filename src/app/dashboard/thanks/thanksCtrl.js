'use strict';

angular.module('siApp.dashboard')
  .controller('ThanksCtrl', ['$scope', 'Thanks', function ($scope, Thanks) {
        $scope.Thanks = Thanks;
    }]);
 