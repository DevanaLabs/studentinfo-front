'use strict';

angular.module('siApp')
.factory('GroupService', function ($cachedResource) {
    var gr = $cachedResource('groups', 'http://localhost:2200/groups/:group', { group: "@group" });
    
    return gr;
});
