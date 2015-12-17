'use strict';

angular.module('siApp')
    .directive('siModal', ['$compile', '$timeout', 'dataService', 'dataExchangeService', function($compile, $timeout, dataService, dataExchangeService){
        return {
            scope: '',
            replace: true,
            templateUrl: 'app/components/modal/views/modal.html',
            link: function ($scope, $element, $attr){
                $scope.id = $attr.elementid;
                $scope.modalType = $attr.type;
                // Fetch data depending on type (also pick color?)
                // lecture - notifications for that lecture
                // group - notifications from all lectures of the group
                // day - events for that day

                $scope.title = "Naslov lol";

                if($scope.modalType == "group") {
                    $scope.data = {};
                    dataService.groupData($scope.id).get().$promise.then(function(data){
                        $scope.data = data.success.data;
                        console.log(data.success.data.group);
                        for(var i = 0; i < data.success.data.group.lectures; i++){
                            if(data.success.data.group.lectures[i].notifications.length > 0) {
                                $scope.notifs.push(data.success.data.group.lectures[i].notifications);
                            }
                        }
                    });
                }
                else if($scope.modalType == "lecture") {
                    $scope.data = {};
                    var daysArray = ["", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак"];
                    dataService.lectureData($scope.id).get({id: $scope.id}).$promise.then(function(data){
                        //$scope.data.day = daysArray[new Date($scope.data.startsAt).getDay()];
                        $scope.day = daysArray[new Date(data.success.data.lecture.startsAt).getDay()];
                        $scope.data = data.success.data.lecture;
                        var a = $scope.data.course.name.split(' ');
                        var b = "";
                        for (var i=0; i<a.length; i++) 
                            if(a[i] != 'и' && a[i] != 'у' && a[i] != 'из' && a[i] != 'на') 
                                b+=a[i].substr(0,1).toUpperCase();
                        $scope.title = b;
                        console.log(data.success.data.lecture);
                    });
                }
                else if($scope.modalType == "day") {

                }

                //GroupService.get({id: 9}).$promise.then(function (data) {
                //    //console.log(data.success.data);
                //    $scope.stuff = data.success.data.group;
                //    $scope.notifs = 0;
                //    // count notifications
                //    for(var i=0; i<$scope.stuff.lectures.length; i++) {
                //        if($scope.stuff.lectures[i].notifications.length > 0) $scope.notifs++;
                //    }
                //    //console.log($scope.dailyStuff);
                //});
            }
        };
    }]);