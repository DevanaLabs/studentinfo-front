'use strict';

angular.module('siApp')
  .controller('LecturesCtrl', ['$scope', 'toastr', 'DateTimeConverter', 'Lectures', 'Pagination', 'EVENTS',
    function ($scope, toastr, DateTimeConverter, Lectures, Pagination, EVENTS) {
      var self = this;

      $scope.canPerformActions = true;
      $scope.pagination = Pagination.getPaginationHelper();

      $scope.loadLectures = function () {
        Lectures.getAll({}).then(function (response) {
          if (response.data.success) {
            $scope.pagination.loadEntities(response.data.success.data);
          }
        }, function (response) {
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
            _.remove($scope.pagination.entities, lecture);
            $scope.pagination.paginateEntities();
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