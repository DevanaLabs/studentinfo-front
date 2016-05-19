'use strict';

angular.module('siApp')
    .factory('CoursesAdmin', ['$q', 'Api', 'DateTimeConverter',
        function ($q, Api, DateTimeConverter) {
            var courses = {};

            courses.getNewInstance = function () {
                return {};
            };

            courses.save = function (course) {
                if (course.id) {
                    return Api.saveCourse(course);
                }
                return Api.makeNewCourse(course);
            };

            courses.get = function (id) {
                return Api.getCourse(id);
            };

            courses.getAll = function (pagination) {
                var deferred = $q.defer();

                Api.getCourses(pagination).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            courses.remove = function (id) {
                return Api.removeCourse(id);
            };

            return courses;
        }])
;