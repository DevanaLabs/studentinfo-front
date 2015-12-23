'use strict';

angular.module('siApp')
    .directive('siModal', ['$compile', '$timeout', 'dataService', 'dataExchangeService', 'Dashboard', function($compile, $timeout, dataService, dataExchangeService, Dashboard){
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
                    // Dashboard.getLectureData RADIMO OVO SLEDECE
                    var group = Dashboard.getGroup($scope.modalId);
                    $scope.modalData = group;
                    $scope.title = group.name;
                    //console.log($scope.modalData);
                    for(var k = 0; k < group.lectures.length; k++){
                        if(group.lectures[k].notifications.length > 0) {
                            for(var j = 0; j < group.lectures[k].notifications.length; j++){
                                $scope.modalNotifs.push(group.lectures[k].notifications[j]);
                            }
                        }
                    }
                    //console.log($scope.modalNotifs);
                }
                else if($scope.modalType == "lecture") {
                    $scope.modalData = {};
                    var daysArray = ["", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"];
                    $scope.lecture = Dashboard.getLecture($scope.modalId, $scope.modalGpid);
                    //console.log($scope.lecture.type);
                    //console.log($scope.lecture.type == "Предавања");
                    //console.log($scope.lecture);
                    $scope.day = daysArray[new Date($scope.lecture.startsAt).getDay()];
                    $scope.title = $scope.lecture.course.name;

                }
                else if($scope.modalType == "day") {

                }

                //GroupService.get({id: 9}).$promise.then(function (data) {
                //    //console.log(data.success.data);
                //    $scope.stuff = data.success.data.group;
                //    $scope.modalNotifs = 0;
                //    // count notifications
                //    for(var i=0; i<$scope.stuff.lectures.length; i++) {
                //        if($scope.stuff.lectures[i].notifications.length > 0) $scope.modalNotifs++;
                //    }
                //    //console.log($scope.dailyStuff);
                //});
            }
        };
    }]);