'use strict';

angular.module('siApp')
  .controller('StaffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$filter',
    'Entities',
    'RegisterToken',
    'toastr',
    function ($scope, $state, $stateParams, $filter, Entities, RegisterToken, toastr) {
      var self = this;

      $scope.query = '';

      $scope.currentPage = 0;
      $scope.totalItems = 0;
      $scope.perPage = 25;
      $scope.paginatedEntities = [];

      $scope.entities = [];

      $scope.staffType = Entities.staffType;
      $scope.selectedCount = 0;

      $scope.loadEntities = function () {
        Entities.getAll({}).then(function (response) {
          if (response.data.success) {
            $scope.entities = _.forEach(response.data.success.data, function (e) {
              e.selected = false;
              e.registered = e.registerToken === '0';
            });
            $scope.currentPage = 1;
          }
        }, function (response) {
          toastr.error('Greska prilikom ucitavanja entiteta');
        });
      };

      $scope.entitySelectChanged = function (entity) {
        if (entity.selected) {
          $scope.selectedCount++;
        } else if ($scope.selectedCount > 0) {
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
            toastr.success('Doslo je do greske, tokeni nisu izdati');
          });
        }
      };

      $scope.deleteEntity = function (entity) {
        Entities.remove(entity.id).then(function (response) {
          if (response.data.success) {
            toastr.success('Uspesno obrisano');
            _.remove($scope.entities, entity);
            self.paginateEntities();
            entity.selected = false;
            $scope.entitySelectChanged(entity);
          }
        }, function () {
          toastr.error('Greska prilikom brisanja!');
        });
      };

      $scope.$watch('currentPage + perPage', function () {
        self.paginateEntities();
      });

      $scope.$watch('query', function (newValue, oldValue) {
        if (newValue === '') {
          self.paginateEntities($scope.entities);
        } else {
          var filtered = $filter('filter')($scope.entities, newValue);
          self.paginateEntities(filtered);
        }
      });

      this.paginateEntities = function (entities) {
        if (entities === undefined) {
          entities = $scope.entities;
        }
        var begin = (($scope.currentPage - 1) * $scope.perPage),
          end = begin + $scope.perPage;
        $scope.paginatedEntities = _.slice(entities, begin, end);
        $scope.totalItems = entities.length;
      };

      $scope.loadEntities();
    }
  ]);
