'use strict';

angular.module('siApp')
    .directive('siModal', ['$compile', '$timeout', 'dataExchangeService', 'Dashboard', function($compile, $timeout, dataExchangeService, Dashboard){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/modal/views/modal.html',
            link: function ($scope, $element, $attr){
                $scope.modalId = $attr.elementid;
                $scope.modalType = $attr.type;
                $scope.modalGpid = $attr.gpid;
                // Fetch data depending on type (also pick color?)
                // lecture - notifications for that lecture
                // group - notifications from all lectures of the group
                // day - events for that day

                $scope.title = "Учитавање";

                if($scope.modalType == "group") {
                    $scope.modalData = {};
                    $scope.modalNotifs = [];
                    var group = Dashboard.getGroup($scope.modalId);
                    $scope.modalData = group;
                    $scope.title = group.name;
                    for(var k = 0; k < group.lectures.length; k++){
                        if(group.lectures[k].notifications.length > 0) {
                            for(var j = 0; j < group.lectures[k].notifications.length; j++){
                                $scope.modalNotifs.push(group.lectures[k].notifications[j]);
                            }
                        }
                    }
                }
                else if($scope.modalType == "lecture") {
                    $scope.modalData = {};
                    var daysArray = ["", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"];
                    $scope.lecture = Dashboard.getLecture($scope.modalId, $scope.modalGpid);
                    $scope.day = daysArray[new Date($scope.lecture.startsAt).getDay()];
                    $scope.title = $scope.lecture.course.name;

                }
                else if($scope.modalType == "day") {
                    var monthsTr = ["", "Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар", "Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"];
                    $scope.title = $attr.day + ". " + monthsTr[$attr.month] + " " + $attr.year;
                    $scope.color = $attr.titlebarcolor;
                    //console.log($scope.color);
                    $scope.modalNotifs = Dashboard.getCourseEventsForDay($attr.year, $attr.month, $attr.day);
                    //console.log($scope.modalNotifs);

                }
            }
        };
    }]);