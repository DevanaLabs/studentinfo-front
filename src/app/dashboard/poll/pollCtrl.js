'use strict';

angular.module('siApp.dashboard')
    .controller('PollCtrl', ['$scope', 'Poll', function($scope, Poll){
        $scope.question = Poll.getQuestion();
        $scope.answers = Poll.getAnswers();

        $scope.sendAnswer = function(answerId) {
            Poll.sendAnswer(answerId);
        };
    }]);