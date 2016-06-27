'use strict';

angular.module('siApp.dashboard')
  .controller('AboutCtrl', ['$scope', 'Feedback', '$timeout', 'localStorageService', 'Thanks',
  function ($scope, Feedback, $timeout, localStorageService, Thanks) {
    function showThanks () {
      angular.element('#about-wrapper').animate({
      	scrollTop: 0
      }, 100);
      $timeout(function () {
        Thanks.show()
      }, 100);
    }


	$scope.sendFeedback = function() {
		var feedbackValue = angular.element("#write");
    if (Feedback.validate(feedbackValue.val())) {
      Feedback.sendDashboardFeedback(feedbackValue.val())
      showThanks();
		}
    feedbackValue.val('');
	};

  //$scope.displayKeyboard = localStorageService.get('auth').user.id == 718;
  $scope.displayKeyboard = localStorageService.get('auth').user.userType == 'Panel';
  }]);
 