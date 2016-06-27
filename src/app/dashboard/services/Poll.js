'use strict';

angular.module('siApp.dashboard')
    .factory('Poll', ['$state', 'Dashboard', 'Api', 'Thanks', function($state, Dashboard, Api, Thanks) {
        var pollService = {};

        //var questions = Dashboard.getQuestions();

        pollService.exists = function() {
            if(Dashboard.getQuestions())
                return Dashboard.getQuestions().length;
            else return false;
        }

        pollService.getQuestions = function() {
            return Dashboard.getQuestions();
        }

        pollService.getQuestion = function() {
            return Dashboard.getQuestions()[0].text;
        }

        pollService.getAnswers = function() {
            return Dashboard.getQuestions()[0].answers;
        }

        pollService.sendAnswer = function(answerId) {
            Api.sendPollAnswer(answerId);
            Thanks.show();
            $state.go('dashboard.home');
        }

        return pollService;
    }]);