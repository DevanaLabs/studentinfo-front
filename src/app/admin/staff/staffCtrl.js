'use strict';

angular.module('siApp')
  .controller('StaffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'Error',
    '$filter',
    'Entities',
    'RegisterToken',
    'Pagination',
    'EVENTS',
    function ($scope, $state, $stateParams, Error, $filter, Entities, RegisterToken, Pagination, EVENTS) {
      var self = this;

      $scope.canPerformActions = true;
      $scope.pagination = Pagination.getPaginationHelper();

      $scope.staffType = Entities.staffType;

      $scope.loadEntities = function () {
        Entities.getAll().then(function (response) {
          if (response.data.success) {
            var entities = _.forEach(response.data.success.data, function (e) {
              e.registered = e.registerToken === '0';
            });
            $scope.pagination.loadEntities(entities);
          }
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      };

      $scope.issueRegisterTokens = function () {
        $scope.canPerformActions = false;
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
              Error.success('REGISTER_TOKENS_ISSUED');
              _.forEach(selectedEntities, function (e) {
                e.registerTokenExpired = false;
              });
            } else {
              Error.error('UNDEFINED_ERROR');
            }
          }, function (response) {
            Error.error(response);
          }).finally(function () {
            $scope.canPerformActions = true;
          });
        }
      };

      $scope.deleteEntity = function (entity) {
        $scope.canPerformActions = false;
        Entities.remove(entity.id).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
            $scope.pagination.removeEntity(entity);
          }
        }, function (response) {
          Error.error(response);
        }).finally(function () {
          $scope.canPerformActions = true;
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
