'use strict';

angular.module('siApp.dashboard')
  .controller('AboutCtrl', ['$scope', 'Feedback', '$timeout', 
  function ($scope, Feedback, $timeout) {
    function showThanks () {
      angular.element('#about-wrapper').animate({
      	scrollTop: 0
      }, 100);
      $timeout(function () {
        angular.element("#feedback-notif").addClass("active");
      }, 100);
      $timeout(function () {
        angular.element("#feedback-notif").removeClass("active");
      }, 5000);
    }


	$scope.sendFeedback = function() {
		var feedbackValue = angular.element("#write");
		if(feedbackValue !== "") {
			Feedback.sendDashboardFeedback(feedbackValue.val());
			showThanks();
			feedbackValue.val('');
		}
	};
  }]);
 