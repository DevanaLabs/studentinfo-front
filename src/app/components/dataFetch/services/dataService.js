'use strict';

angular.module("siApp")
.service('dataService', function ($cachedResource) {
    var showDebug = 1;
    var url = "http://10.0.21.242:2200/"
    var filterData = function(){ if(showDebug) console.log("get group data"); return $cachedResource('data', (url + 'data/')); };
    var groupData = function(id){ if(showDebug) console.log("get group data"); return $cachedResource('group', (url + 'group/:id'), { id: "@id" }); };
    var classroomData = function(id){ if(showDebug) console.log("get classroom data"); return $cachedResource('classroom', (url + 'classroom/:id'), { id: "@id" }); };
    var teacherData = function(id){ if(showDebug) console.log("get teacher data"); return $cachedResource('professor', (url + 'professor/:id'), { id: "@id" }); };
    var lectureData = function(id){ if(showDebug) console.log("get lecture data"); return $cachedResource('lecture', (url + 'lecture/:id'), { id: "@id" }); };

    return {
        filterData: filterData,
        groupData: groupData,
        classroomData: classroomData,
        teacherData: teacherData,
        lectureData: lectureData
    };
 })


.service('groupShitService', function($http) {
    var url = "http://10.0.23.4:2200/";
    //return $cachedResource('group', 'http://10.0.21.242:2200/group/:id', { id: "@id" });
    return { asdf: function(id) { return $http.get( url + 'group/'+ id ); } }
});