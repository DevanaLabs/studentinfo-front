'use strict';

angular.module('siApp')
    .directive('siTeacherpicker', ['$compile', '$timeout', 'dataExchangeService',function($compile, $timeout, dataExchangeService){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/preSchedule/teachers/views/teacherPicker.html',
            link: function ($scope, $element, $attr){
                $scope.text = $attr.details;
                $scope.gpid = $attr.asdf;
                $scope.name = $attr.nm;
                $scope.add = function (e) {
                    //console.log(e);
                    dataExchangeService.id = $scope.gpid;
                    dataExchangeService.type = 'teacher';
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
                document.getElementById("pickersWrapper").onscroll = function() {
                    var letters = document.getElementsByClassName("teacherLetter");
                    var pos = document.getElementById("pickersWrapper").scrollTop;
                    for(var i=0; i<letters.length; i++) {
                        if(letters[i].offsetTop -200 >= pos) {
                            //console.log(letters[i].id);
                            $(".topFilterWrapper.sub.active").removeClass('active');
                            document.getElementById("topsub"+letters[i].id).className += ' active';
                            break; 
                        }
                    }
                }
            }
        };
    }]);