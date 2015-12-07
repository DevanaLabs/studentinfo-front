'use strict';

angular.module('siApp')
    .directive('siGrouppicker', [function(){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/preSchedule/groups/views/groupPicker.html',
            link: function (scope, element, attr){

            }
        };
    }]);