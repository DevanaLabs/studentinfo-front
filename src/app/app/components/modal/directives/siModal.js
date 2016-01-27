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
                var displayedDate = {};
                displayedDate.year = $attr.year;
                displayedDate.month = $attr.month;
                displayedDate.date = $attr.day;
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
                    //console.log($scope.lecture);
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

                    $scope.nextDay = function () {
                        var d = moment(displayedDate.year + " " + displayedDate.month + " " + displayedDate.date, "YYYY MM DD").add(1, 'days');
                        $scope.globalEv = Dashboard.getGlobalEventsForDay(d.year(), (d.month()+1), d.date());
                        $scope.modalNotifs = Dashboard.getCourseEventsForDay(d.year(), (d.month()+1), d.date());
                        $scope.title = d.date() + ". " + monthsTr[d.month()+1] + " " + d.year();
                        //console.log($scope.globalEv);
                        var classMap = {
                            "Испитни рок" : "blue",
                            "Колоквијумска недеља" : "orange",
                            "Нерадни дани" : "gray",
                            "Плаћање школарине" : "green"
                        };
                        if($scope.globalEv.length > 1) {
                            $scope.color = 'multi';
                        }
                        else if($scope.globalEv.length == 0) {
                            $scope.color = 'white';
                        }
                        else {
                            if(classMap[$scope.globalEv[0].type] === -1) {
                                $scope.color = "yellow";
                            }
                            else {
                                $scope.color = classMap[$scope.globalEv[0].type];
                            }
                        }
                        displayedDate.year = d.year();
                        displayedDate.month = d.month() + 1;
                        displayedDate.date = d.date();
                    }
                    $scope.prevDay = function () {
                        var d = moment(displayedDate.year + " " + displayedDate.month + " " + displayedDate.date, "YYYY MM DD").subtract(1, 'days');
                        $scope.globalEv = Dashboard.getGlobalEventsForDay(d.year(), (d.month()+1), d.date());
                        $scope.modalNotifs = Dashboard.getCourseEventsForDay(d.year(), (d.month()+1), d.date());
                        $scope.title = d.date() + ". " + monthsTr[d.month()+1] + " " + d.year();
                        //console.log($scope.globalEv);
                        var classMap = {
                            "Испитни рок" : "blue",
                            "Колоквијумска недеља" : "orange",
                            "Нерадни дани" : "gray",
                            "Плаћање школарине" : "green"
                        };
                        if($scope.globalEv.length > 1) {
                            $scope.color = 'multi';
                        }
                        else if($scope.globalEv.length == 0) {
                            $scope.color = 'white';
                        }
                        else {
                            if(classMap[$scope.globalEv[0].type] === -1) {
                                $scope.color = "yellow";
                            }
                            else {
                                $scope.color = classMap[$scope.globalEv[0].type];
                            }
                        }
                        displayedDate.year = d.year();
                        displayedDate.month = d.month() + 1;
                        displayedDate.date = d.date();
                    }
                    $("#displayedModalMain").on("swiperight",function(event){
                        angular.element("#displayedModalMain").scope().prevDay();
                    });
                    $("#displayedModalMain").on("swipeleft",function(event){
                        angular.element("#displayedModalMain").scope().nextDay();
                    });
                }
            }
        };
    }]);