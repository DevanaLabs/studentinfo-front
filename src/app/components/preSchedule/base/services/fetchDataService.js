'use strict';

angular.module('siApp')
.factory('FetchDataService', function ($cachedResource) {
    return $cachedResource('classrooms', 'http://localhost:2200/data/:data', { data: "@data" });
});
