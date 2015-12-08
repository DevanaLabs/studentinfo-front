'use strict';

angular.module('siApp')
.factory('GroupService', function ($cachedResource) {
    return $cachedResource('groups', 'http://localhost:2200/group/:id', { id: "@id" });
});
