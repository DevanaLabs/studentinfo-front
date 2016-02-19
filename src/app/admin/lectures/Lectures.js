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
            name: 'OMG'
          },
          {
            id: 3,
            name: 'OMGG'
          }
        ]
      };

      var transformIncomingLecture = function (lecture) {
        lecture.startsAt = DateTimeConverter.fromBeginningOfTheWeek(lecture.time.startsAt);
        lecture.endsAt = DateTimeConverter.fromBeginningOfTheWeek(lecture.time.endsAt);
        lecture.typeName = lectures.types[lecture.type].name;
        return lecture;
      };

      var transformOutgoingLecture = function (lecture) {
        lecture.startsAt = DateTimeConverter.toBeginningOfTheWeek(lecture.time.startsAt);
        lecture.endsAt = DateTimeConverter.toBeginningOfTheWeek(lecture.time.endsAt);
        return lecture;
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
        lecture = transformOutgoingLecture(lecture);
        if (lecture.id) {
          return Api.saveLecture(lecture);
        }
        return Api.makeNewLecture(lecture);
      };

      lectures.get = function (id) {
        var deferred = $q.defer();

        Api.getLecture(id).then(function (response) {
          response.data.success.data.lecture.time.startsAt =
            DateTimeConverter.fromBeginningOfTheWeekSeparated(response.data.success.data.lecture.time.startsAt);
          response.data.success.data.lecture.time.endsAt =
            DateTimeConverter.fromBeginningOfTheWeekSeparated(response.data.success.data.lecture.time.endsAt);

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
            l = transformIncomingLecture(l);
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