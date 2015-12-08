'use strict';

angular.module('siApp')
.factory('ClassroomService', function ($cachedResource) {
    return $cachedResource('classrooms', 'http://localhost:2200/classroom/:id', { id: "@id"});
 });

