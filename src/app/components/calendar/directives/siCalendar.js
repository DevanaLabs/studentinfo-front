'use strict';

angular.module('siApp')
    .directive('siCalendar', [function(){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/calendar/views/calendar.html',
            link: function (scope, element, attr){

            }
        };
    }]);