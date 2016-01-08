'use strict';

angular.module('siApp')
    .directive('siClassroompicker', ['$compile', '$timeout', 'dataExchangeService',function($compile, $timeout, dataExchangeService){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/preSchedule/classrooms/views/classroomPicker.html',
            link: function ($scope, $element, $attr){
                $scope.text = $attr.details;
                $scope.gpid = $attr.asdf;
                $scope.name = $attr.nm;
                $scope.add = function (e) {
                    //console.log(e);
                    dataExchangeService.id = $scope.gpid;
                    dataExchangeService.type = 'classroom';
                    dataExchangeService.name = $scope.text;
                   var el = $compile( "<si-table id='scheduleWrapper' style='transform: scale3d(.01, .01, 1) translate3d(" +  ((e.pageX-440)*100) + "px, " +  (e.pageY*100) + "px, 0);'></si-table>" )( $scope );
                    $element.parent().append( el );
                    $timeout(function() {
                        angular.element("#scheduleWrapper").addClass("displayed");
                    }, 100);
                };
                $scope.closeTable = function () {
                    angular.element("#scheduleWrapper").removeClass("displayed");
                    $timeout(function() {
                        angular.element("#scheduleWrapper").remove();
                    }, 600);
                };
            }
        };
    }]);