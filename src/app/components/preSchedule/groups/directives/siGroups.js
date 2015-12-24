'use strict';

angular.module('siApp')
    .directive('siGrouppicker', ['$compile', '$timeout', 'dataExchangeService',function($compile, $timeout, dataExchangeService){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/preSchedule/groups/views/groupPicker.html',
            link: function ($scope, $element, $attr){
                $scope.text = $attr.details;
                $scope.gpid = $attr.asdf;
                $scope.name = $attr.nm;
                $scope.add = function (e) {
                    //console.log(e);
                    dataExchangeService.id = $scope.gpid;
                    dataExchangeService.type = 'group';
                    dataExchangeService.name = $scope.text;
                    var el = $compile( "<si-table id='scheduleWrapper' style='top: " +  e.pageY + "px; left: calc(" +  e.pageX + "px - 23vw);'></si-table>" )( $scope );
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