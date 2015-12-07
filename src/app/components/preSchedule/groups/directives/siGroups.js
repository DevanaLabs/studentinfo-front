'use strict';

angular.module('siApp')
    .directive('siGrouppicker', function($compile){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/preSchedule/groups/views/groupPicker.html',
            link: function ($scope, $element, $attr){
            	$scope.testF = function(e) {
                    //document.getElementById("mainWrapper").className += " tableDisplayed";
                    //attr.$$element[0].className += " big";
                };
                $scope.add = function (e) {
                    console.log(e);
                    var el = $compile( "<si-table style='top: " +  e.pageY + "px; left: calc(" +  e.pageX + "px - 23vw);' ng-click='makeBig()'></si-table>" )( $scope );
                    $element.parent().append( el );
                };
            }
        };
    });