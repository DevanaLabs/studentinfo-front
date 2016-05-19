'use strict';

angular.module('siApp')
    .factory('ClassroomsAdmin', ['$q', 'Api', 'DateTimeConverter',
        function ($q, Api, DateTimeConverter) {
            var classrooms = {};

            classrooms.getNewInstance = function () {
                return {};
            };

            classrooms.save = function (classroom) {
                if (classroom.id) {
                    return Api.saveClassroom(classroom);
                }
                return Api.makeNewClassroom(classroom);
            };

            classrooms.get = function (id) {
                return Api.getClassroom(id);
            };

            classrooms.getAll = function (pagination) {
                var deferred = $q.defer();

                Api.getClassrooms(pagination).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            classrooms.remove = function (id) {
                return Api.removeClassroom(id);
            };

            return classrooms;
        }])
;