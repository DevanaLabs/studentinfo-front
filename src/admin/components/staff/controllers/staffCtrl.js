'use strict';

angular.module('siAdminApp')
  .controller('StaffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'EntityService',
    'RegisterTokenService',
    'toastr',
    function ($scope, $state, $stateParams, EntityService, RegisterTokenService, toastr) {
      var self = this;

      $scope.query = '';
      $scope.currentPage = 0;
      $scope.perPage = 25;
      $scope.paginatedEntities = [];
      $scope.entities = [];
      $scope.type = EntityService.type;
      $scope.selectedCount = 0;

      $scope.loadEntities = function () {
        EntityService.getAll({}).$promise.then(function success (response) {
          if (response.success) {
            console.log(response.success.data);
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

      $scope.deleteEntities = function () {
        var selected = _.filter($scope.entities, function (e) {
          return e.selected;
        });
        var errorHappened = false;

        _.forEach(selected, function (e) {
          EntityService.remove({id: e.id}, function (response) {
            if (response.success) {
              // TODO: Ovo ne radi iz nekog razloga, ne update-uje $scope.entities
              _.remove($scope.entities, function (scopeE) {
                return scopeE.id === e.id;
              });
            } else {
              console.error(response);
              errorHappened = true;
            }
          }, function () {
            toastr.error('Greska prilikom brisanja!');
            selected = [];
          });
        });

        if (errorHappened) {
          toastr.error('Greska!');
        } else {
          toastr.success('Uspesno obrisani!');
        }
      };

      $scope.loadEntities();
    }
  ]);