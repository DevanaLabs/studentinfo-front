'use strict';

angular.module('siApp')
  .controller('FeedbackCtrl', ['$scope', 'Feedback', 'toastr',
    function ($scope, Feedback, toastr) {

      $scope.canSubmit = true;
      $scope.feedback = '';

      $scope.onSubmit = function () {
        $scope.canSubmit = false;
        Feedback.sendAdminPanelFeedback($scope.feedback).then(function (response) {
          toastr.success('Hvala Vam na povratim informacijama');
        }, function (response) {
          toastr.error('Greska!');
        }).finally(function () {
          $scope.canSubmit = true;
        });
      };

    }]);