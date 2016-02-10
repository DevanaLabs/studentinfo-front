'use strict';

angular.module('siAdminApp')
  .controller('StaffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'EntityService',
    '$filter',
    'RegisterTokenService',
    'toastr',
    function ($scope, $state, $stateParams, $filter, EntityService, RegisterTokenService, toastr) {
      var self = this;

      $scope.query = '';
      $scope.currentPage = 0;
      $scope.totalItems = 0;
      $scope.perPage = 25;
      $scope.paginatedEntities = [];

      $scope.entities = [];

      $scope.type = EntityService.type;
      $scope.selectedCount = 0;

      $scope.loadEntities = function () {
        EntityService.getAll({}).$promise.then(function success (response) {
          if (response.data.success) {
            $scope.entities = _.forEach(response.success.data, function (e) {
              e.selected = false;
              e.registered = e.registerToken === '0';
            });
            $scope.currentPage = 1;
          } else {
            toastr.error('Greska prilikom ucitavanja entiteta');
          }
        }, function error () {
          toastr.error('Greska prilikom ucitavanja entiteta');
        });
      };

      $scope.$watch('query', function (newValue, oldValue) {
        if (newValue === '') {
          self.paginateEntities($scope.entities);
        } else {
          var filtered = $filter('filter')($scope.entities, newValue);
          self.paginateEntities(filtered);
        }
      });

      $scope.$watch('currentPage + perPage', function () {
        self.paginateEntities();
      });

      $scope.entitySelectChanged = function (entity) {
        if (entity.selected) {
          $scope.selectedCount++;
        } else {
          $scope.selectedCount--;
        }
      };

      $scope.issueTokens = function () {
        var emails = _.map(
          _.filter($scope.entities, function (e) {
            return e.selected && !e.registered;
          }),
          function (e) {
            return e.email.email;
          });

        if (emails.length) {
          var response = RegisterTokenService.sendInvitation({
            emails: emails
          }, function () {
            if (response.success) {
              toastr.success('Tokeni su izdati');
            } else {
              toastr.success('Tokeni nisu izdati');
            }
          });
        }
      };

      $scope.deleteEntities = function (entity) {
        EntityService.remove({id: entity.id}, function (response) {
          if (response.success) {
            _.remove($scope.entities, function (e) {
              return entity.id === e.id;
              entity.selected = false;
              $scope.entitySelectChanged(entity);
              self.paginateEntities();
            });
          } else {
            console.error(response);
          }
        }, function () {
          toastr.error('Greska prilikom brisanja!');
        });
      };

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
  ])
;
