'use strict';

angular.module('siApp.dashboard')
    .service('Thanks', ['$timeout', function($timeout) {
        var thanksService = {};

        thanksService.displayed = false;

        thanksService.show = function() {
            thanksService.displayed = true;
            $timeout(function(){
                thanksService.displayed = false;
            }, 5000);
        };

        return thanksService ;
    }]);