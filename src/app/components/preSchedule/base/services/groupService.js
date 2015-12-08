'use strict';

angular.module('siApp')
.factory('GroupService', function ($cachedResource) {
    return $cachedResource('group', 'http://localhost:2200/group/:id', { id: "@id" });
});
