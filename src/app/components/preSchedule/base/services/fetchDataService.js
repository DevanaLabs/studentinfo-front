'use strict';

angular.module('siApp')
.factory('FetchDataService', ['$cachedResource', function ($cachedResource) {
    return $cachedResource('data', 'http://10.0.21.242:2200/data/:data', { data: "@data" });
}]);
