'use strict';

angular.module('siApp')
    .factory('GroupsAdmin', ['$q', 'Api', 'DateTimeConverter',
        function ($q, Api, DateTimeConverter) {
            var groups = {};

            groups.getNewInstance = function () {
                return {};
            };

            groups.save = function (group) {
                if (group.id) {
                    return Api.saveGroup(group);
                }
                return Api.makeNewGroup(group);
            };

            groups.get = function (id) {
                return Api.getGroup(id);
            };

            groups.getAll = function (pagination) {
                if (pagination === undefined) {
                    pagination = {};
                }
                return Api.getGroups(pagination);
            };

            groups.remove = function (id) {
                return Api.removeGroup(id);
            };

            return groups;
        }])
;