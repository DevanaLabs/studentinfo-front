'use strict';

angular.module('siApp')
.factory('GroupService', function ($cachedResource) {
    var gr = $cachedResource('groups', 'http://localhost:2200/groups/:group', { group: "@group" });
    filterSets = [];
    for(i=0; i<gr: i++)
    	if(filterSets.indexOf(gr[i].year) == -1) filterSets.push(gr[i].year);
    return [gr, filterSets];
});
