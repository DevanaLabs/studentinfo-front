'use strict';

angular.module('siApp')
    .factory('Faculty', ['Api', function (Api) {
        var faculty = {};

        faculty.changeSemesterYear = function (semester, year) {
            return Api.setSettings(semester, year);
        };

        faculty.get = function () {
            return Api.getSettings();
        };

        return faculty;
    }]);