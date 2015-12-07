'use strict';

angular.module('siApp')
.factory('ProfessorService', function ($cachedResource) {
    var resource = $cachedResource('professors', 'http://localhost:2200/professors/:professor', { professor: "@professor" });
    return resource;
});
