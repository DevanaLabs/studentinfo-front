'use strict';

angular.module('siApp')
.factory('ProfessorService', function ($cachedResource) {
    return $cachedResource('professor', 'http://localhost:2200/professor/:id', { id: "@id" });
});
