'use strict';

angular.module('siApp')
.factory('ProfessorService', function ($cachedResource) {
    return $cachedResource('professor', 'http://10.0.21.242:2200/professor/:id', { id: "@id" });
});
