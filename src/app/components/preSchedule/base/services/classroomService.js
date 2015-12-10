'use strict';

angular.module('siApp')
.factory('ClassroomService', function ($cachedResource) {
    return $cachedResource('classroom', 'http://10.0.21.242:2200/classroom/:id', { id: "@id"});
 });

