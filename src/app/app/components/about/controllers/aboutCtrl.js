'use strict';

angular.module('siApp').controller('aboutCtrl', ['$scope', 'API_BASE_URL', '$http', '$compile', '$timeout', function ($scope, API_BASE_URL, $http, $compile, $timeout) {
  $scope.showKeyboard = false;

  function showThanks () {
    $timeout(function () {
      angular.element("#feedbackNotif").addClass("active");
    }, 100)
    $timeout(function () {
      angular.element("#feedbackNotif").removeClass("active");
    }, 5000)
  }

  $scope.sendFeedback = function () {
    var data = {'text': angular.element("#write").val()};
    //console.log(data);
    if(data.text != "") {
      //console.log(data);
      //console.log(API_BASE_URL + 'feedback/');
      $http.post(API_BASE_URL + 'feedback/', data).then(
        function (response) {
          //console.log(response);
        },
        function (response) {
          //console.log(response);
        }
      );
      angular.element("#write").val("");
      $scope.showKeyboard = false;
      showThanks();
    }
  }

}]);