'use strict';

angular.module('siApp')
  .controller('StaffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'toastr',
    '$filter',
    'Entities',
    'RegisterToken',
    'Pagination',
    function ($scope, $state, $stateParams, toastr, $filter, Entities, RegisterToken, Pagination) {
      var self = this;

      $scope.pagination = Pagination.getPaginationHelper();

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
            $scope.pagination.init($scope.entities);
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
            entity.selected = false;
            $scope.entitySelectChanged(entity);
            $scope.pagination.paginateEntities($scope.entities);
          }
        }, function () {
          toastr.error('Greska prilikom brisanja!');
        });
      };

      $scope.$watch('pagination.currentPage + pagination.perPage', function () {
        $scope.pagination.paginateEntities($scope.entities);
      });

      $scope.$watch('pagination.query', function (newValue, oldValue) {
        if (newValue === '') {
          $scope.pagination.paginateEntities($scope.entities);
        } else {
          var filtered = $filter('filter')($scope.entities, newValue);
          $scope.pagination.paginateEntities(filtered);
        }
      });

      $scope.loadEntities();
    }
  ]);
