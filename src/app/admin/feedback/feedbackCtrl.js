'use strict';

angular.module('siApp')
  .controller('FeedbackCtrl', ['$scope', '$state', 'Feedback', 'Error', 'EVENTS',
    function ($scope, $state, Feedback, Error, EVENTS) {

      $scope.canSubmit = true;
      $scope.feedback = '';

      $scope.onSubmit = function () {
        $scope.canSubmit = false;
        Feedback.sendAdminPanelFeedback($scope.feedback).then(function (response) {
          Error.success('THANKS_FOR_FEEDBACK');
          $state.go('admin.overview');
        }, function (response) {
          Error.httpError(response);
        }).finally(function () {
          $scope.canSubmit = true;
        });
      };

      $scope.$emit(EVENTS.UI.HIDE_LOADING_SCREEN);
    }]);