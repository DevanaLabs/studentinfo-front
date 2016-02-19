'use strict';

angular.module('siApp')
  .controller('LecturesCtrl', ['$scope', 'toastr', 'DateTimeConverter', 'Lectures', 'Pagination', 'EVENTS',
    function ($scope, toastr, DateTimeConverter, Lectures, Pagination, EVENTS) {
      var self = this;

      $scope.canPerformActions = true;
      $scope.pagination = Pagination.getPaginationHelper();

      $scope.loadLectures = function () {
        Lectures.getAll().then(function (response) {
          if (response.data.success) {
            $scope.pagination.loadEntities(response.data.success.data);
          }
        }, function () {
          toastr.error('Greska prilikom ucitavanja!');
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      };

      $scope.deleteLecture = function (lecture) {
        $scope.canPerformActions = false;
        Lectures.remove(lecture.id).then(function (response) {
          if (response.data.success) {
            toastr.success('Uspesno obrisano');
            $scope.pagination.removeEntity(lecture);
          }
        }, function () {
          toastr.error('Greska prilikom brisanja!');
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