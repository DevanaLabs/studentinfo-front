'use strict';

angular.module('siApp')
.factory('GroupService', function ($cachedResource) {
    return $cachedResource('group', 'http://10.0.21.242:2200/group/:id', { id: "@id" });
});
