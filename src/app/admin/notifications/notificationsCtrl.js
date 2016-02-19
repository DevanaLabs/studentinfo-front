'use strict';

angular.module('siApp')
  .controller('NotificationsCtrl', ['$scope', '$stateParams', 'toastr',
    'DateTimeConverter', 'Notifications', 'Pagination', 'EVENTS',
    function ($scope, $stateParams, toastr, DateTimeConverter, Notifications, Pagination, EVENTS) {
      var self = this;

      $scope.pagination = Pagination.getPaginationHelper();

      $scope.notificationsType = Notifications.notificationsType;

      $scope.loadNotifications = function () {
        var requestPromise = null;

        if ($stateParams.relatedEntityId) {
          requestPromise = Notifications.getAllForRelatedEntity($stateParams.relatedEntityId, {});
        } else {
          requestPromise = Notifications.getAll();
        }

        requestPromise.then(function (response) {
          if (response.data.success) {
            $scope.pagination.loadEntities(response.data.success.data);
          }
        }, function () {
          toastr.error('Greska prilikom ucitavanja obavestenja!');
        }).finally(function () {
          $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
        });
      };

      $scope.deleteNotification = function (notification) {
        Notifications.remove(notification.id).then(function (response) {
          if (response.data.success) {
            toastr.success('Uspesno obrisano');
            $scope.pagination.removeEntity(notification);
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

      $scope.loadNotifications();
    }]);