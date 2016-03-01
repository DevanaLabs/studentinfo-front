'use strict';

angular.module('siApp')
  .controller('LecturesCtrl', ['$scope', 'Error', 'DateTimeConverter', 'Lectures', 'Pagination', 'EVENTS',
    function ($scope, Error, DateTimeConverter, Lectures, Pagination, EVENTS) {
      var self = this;

      $scope.canPerformActions = true;
      $scope.pagination = Pagination.getPaginationHelper();

      $scope.loadLectures = function () {
        Lectures.getAll().then(function (response) {
          if (response.data.success) {
            $scope.pagination.loadEntities(response.data.success.data);
          }
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      };

      $scope.deleteLecture = function (lecture) {
        $scope.canPerformActions = false;
        Lectures.remove(lecture.id).then(function (response) {
          if (response.data.success) {
            Error.success('CHANGES_SAVED');
            $scope.pagination.removeEntity(lecture);
          }
        }, function (response) {
          Error.httpError(response);
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

      $scope.loadLectures();
    }]);