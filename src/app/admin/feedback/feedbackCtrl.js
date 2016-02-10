'use strict';

angular.module('siApp')
  .controller('FeedbackCtrl', ['$scope', 'Feedback', 'toastr',
    function ($scope, Feedback, toastr) {

      $scope.feedbackSending = false;
      $scope.feedback = '';

      $scope.onSubmit = function () {
        $scope.feedbackSending = true;
        Feedback.sendAdminPanelFeedback($scope.feedback).then(function (response) {
          toastr.success('Hvala Vam na povratim informacijama');
        }, function (response) {
          toastr.error('Greska!');
        }).finally(function () {
          $scope.feedbackSending = false;
        });
      };

    }]);