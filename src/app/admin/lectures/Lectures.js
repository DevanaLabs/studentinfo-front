'use strict';

angular.module('siApp')
  .factory('Lectures', ['$q', 'Api', 'DateTimeConverter',
    function ($q, Api, DateTimeConverter) {
      var lectures = {
        types: [
          {
            id: 0,
            name: 'DISCOURSE'
          },
          {
            id: 1,
            name: 'EXERCISES'
          },
          {
            id: 2,
            name: 'DISCOURSE_AND_EXERCISES'
          },
          {
            id: 3,
            name: 'PRACTICUM'
          }
        ]
      };

      var transformIncomingLecture = function (lecture) {
        lecture.startsAt = DateTimeConverter.fromBeginningOfTheWeek(lecture.time.startsAt);
        lecture.endsAt = DateTimeConverter.fromBeginningOfTheWeek(lecture.time.endsAt);
        lecture.day = Math.floor(lecture.time.startsAt / 86400);
        lecture.typeName = lectures.types[lecture.type].name;
      };

      var transformOutgoingLecture = function (lecture) {
        lecture.startsAt = DateTimeConverter.toBeginningOfTheWeek(lecture.time.startsAt);
        lecture.endsAt = DateTimeConverter.toBeginningOfTheWeek(lecture.time.endsAt);
      };

      lectures.getNewInstance = function () {
        return {
          time: {
            startsAt: {
              day: 0,
              time: moment().startOf('isoweek')
            },
            endsAt: {
              day: 0,
              time: moment().startOf('isoweek')
            }
          }
        };
      };

      lectures.validate = function (event) {
        return true;
      };

      lectures.save = function (lecture) {
        console.log(lecture);
        transformOutgoingLecture(lecture);
        if (lecture.id) {
          return Api.saveLecture(lecture);
        }
        return Api.makeNewLecture(lecture);
      };

      lectures.get = function (id) {
        var deferred = $q.defer();

        Api.getLecture(id).then(function (response) {
          transformIncomingLecture(response.data.success.data.lecture);
          deferred.resolve(response);
        }, function (response) {
          deferred.reject(response);
        });

        return deferred.promise;
      };

      lectures.getAll = function (pagination) {
        var deferred = $q.defer();

        Api.getLectures(pagination).then(function (response) {
          response.data.success.data = _.forEach(response.data.success.data, function (l) {
            transformIncomingLecture(l);
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
    }])
;