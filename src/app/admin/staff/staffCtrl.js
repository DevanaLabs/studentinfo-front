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
    'EVENTS',
    function ($scope, $state, $stateParams, toastr, $filter, Entities, RegisterToken, Pagination, EVENTS) {
      var self = this;

      $scope.pagination = Pagination.getPaginationHelper();

      $scope.staffType = Entities.staffType;

      $scope.loadEntities = function () {
        Entities.getAll({}).then(function (response) {
          if (response.data.success) {
            var entities = _.forEach(response.data.success.data, function (e) {
              e.selected = false;
              e.registered = e.registerToken === '0';
            });
            $scope.pagination.loadEntities(entities);
          }
        }, function (response) {
          toastr.error('Greska prilikom ucitavanja entiteta');
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        })
      };

      $scope.issueRegisterTokens = function () {
        var selectedEntities = _.filter($scope.pagination.entities, function (e) {
          return e.selected && !e.registered;
        });
        var emails = _.map(
          selectedEntities,
          function (e) {
            return e.email.email;
          });

        if (emails.length) {
          RegisterToken.issue(emails).then(function (response) {
            if (response.data.success) {
              toastr.success('Tokeni su izdati');
              _.forEach(selectedEntities, function (e) {
                e.registerTokenExpired = false;
              });
            } else {
              toastr.error('Doslo je do greske, tokeni nisu izdati');
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
            _.remove($scope.pagination.entities, entity);
            entity.selected = false;
            $scope.pagination.entitySelectChanged(entity);
            $scope.pagination.paginateEntities();
          }
        }, function () {
          toastr.error('Greska prilikom brisanja!');
        });
      };

      $scope.$watch('pagination.currentPage + pagination.perPage', function () {
        $scope.pagination.paginateEntities();
      });

      $scope.$watch('pagination.query', function (newValue, oldValue) {
        $scope.pagination.applySearchFilter(newValue);
      });

      $scope.loadEntities();
    }
  ]);
