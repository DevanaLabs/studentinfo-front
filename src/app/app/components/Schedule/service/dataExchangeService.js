'use strict';

angular.module('siApp')
.factory('dataExchangeService', ['$cachedResource',function ($cachedResource) {
	this.type = "classroom";
	this.id = "1";
	this.name = "100";
    return {type: this.type, id: this.id};
    //return $cachedResource('group', 'http://10.0.21.242:2200/group/:id', { id: "@id" });
}]);