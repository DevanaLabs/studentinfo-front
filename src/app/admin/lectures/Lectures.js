'use strict';

angular.module('siApp')
  .factory('Lectures', ['$q', 'Api', 'DateTimeConverter',
    function ($q, Api, DateTimeConverter) {
      var lectures = {};

      lectures.validate = function (event) {
        return true;
      };

      lectures.get = function (id) {
        var deferred = $q.defer();

        Api.getLecture(id).then(function (response) {
          response.data.success.data.lecture.startsAt =
            DateTimeConverter.fromBegginingOfTheWeek(response.data.success.data.lecture.time.startsAt);
          response.data.success.data.lecture.endsAt =
            DateTimeConverter.fromBegginingOfTheWeek(response.data.success.data.lecture.time.endsAt);

          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      lectures.getAll = function (pagination) {
        var deferred = $q.defer();

        Api.getLectures(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (lecture) {
            lecture.startsAt =
              DateTimeConverter.fromBegginingOfTheWeek(lecture.time.startsAt);
            lecture.endsAt =
              DateTimeConverter.fromBegginingOfTheWeek(lecture.time.endsAt);
          });
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      lectures.remove = function (id) {
        return Api.removeLecture(id);
      };

      return lectures;
    }]);