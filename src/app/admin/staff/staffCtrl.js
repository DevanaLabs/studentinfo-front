'use strict';

angular.module('siApp')
  .controller('StaffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'Entities',
    'RegisterToken',
    'toastr',
    function ($scope, $state, $stateParams, Entities, RegisterToken, toastr) {
      var self = this;

      $scope.query = '';
      $scope.currentPage = 0;
      $scope.perPage = 25;
      $scope.paginatedEntities = [];
      $scope.entities = [];
      $scope.staffType = Entities.staffType;
      $scope.selectedCount = 0;

      $scope.loadEntities = function () {
        Entities.getAll().then(function (response) {
          if (response.data.success) {
            $scope.entities = _.forEach(response.data.success.data, function (e) {
              e.selected = false;
              e.registered = e.registerToken === '0';
            });
            $scope.currentPage = 1;
          }
        }, function (response) {
          console.error(response);
          toastr.error('Greska prilikom ucitavanja entiteta');
        });
      };

      $scope.$watch('currentPage + perPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.perPage),
          end = begin + $scope.perPage;
        $scope.paginatedEntities = _.slice($scope.entities, begin, end);
      });

      $scope.entitySelectChanged = function (entity) {
        if (entity.selected) {
          $scope.selectedCount++;
        } else {
          $scope.selectedCount--;
        }
      };

      $scope.issueRegisterTokens = function () {
        var emails = _.map(
          _.filter($scope.entities, function (e) {
            return e.selected && !e.registered;
          }),
          function (e) {
            return e.email.email;
          });

        if (emails.length) {
          RegisterToken.issue(emails).then(function (response) {
            if (response.success) {
              toastr.success('Tokeni su izdati');
            } else {
              toastr.success('Tokeni nisu izdati');
            }
          }, function (response) {
            console.error(response);
            toastr.success('Doslo je do greske, tokeni nisu izdati');
          });
        }
      };

      $scope.deleteEntities = function () {
        var selected = _.filter($scope.entities, function (e) {
          return e.selected;
        });

        _.forEach(selected, function (e) {
          Entities.remove(e.id).then(function (response) {
            if (response.success) {
              $scope.entities = _.remove($scope.entities, function (entity) {
                return e.id === entity.id;
              });
            } else {
              console.error(response);
            }
          }, function () {
            toastr.error('Greska prilikom brisanja!');
            selected = [];
          });
        });
      };

      $scope.loadEntities();
    }
  ]);
