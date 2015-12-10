'use strict';

angular.module('siApp')
    .directive('siClassroompicker', function($compile, $timeout){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/preSchedule/classrooms/views/classroomPicker.html',
            link: function ($scope, $element, $attr){
                $scope.text = $attr.details;
                $scope.add = function (e) {
                    console.log(e);
                    var el = $compile( "<si-table id='scheduleWrapper' style='top: " +  e.pageY + "px; left: calc(" +  e.pageX + "px - 23vw);'></si-table>" )( $scope );
                    $element.parent().append( el );
                    $timeout(function() {
                        angular.element("#scheduleWrapper").addClass("displayed")
                    }, 100);
                };
                $scope.closeTable = function () {
                    angular.element("#scheduleWrapper").removeClass("displayed");
                    $timeout(function() {
                        angular.element("#scheduleWrapper").remove();
                    }, 600);
                }
            }
        };
    });