'use strict';

angular.module('siApp')
  .factory('Api', ['$rootScope', '$http', 'API_URL', 'ApiUrlBuilder', 'EVENTS',
    function ($rootScope, $http, API_URL, ApiUrlBuilder, EVENTS) {
      var accessToken = null;

      $rootScope.$on(EVENTS.AUTH.OAUTH2_ACCESS_TOKEN_CHANGED, function (event, authToken) {
        accessToken = authToken;
      });

      return {
        login: function (credentials) {
          return $http.post(ApiUrlBuilder.build('oauth/access_token'), credentials, {
            noOAuth2: true
          });
        },
        authUser: function (credentials) {
          return $http.post(ApiUrlBuilder.build('auth'), credentials, {
            noOAuth2: true
          });
        },
        logout: function () {
          return $http.delete(ApiUrlBuilder.build('auth'));
        },
        fetchDashboardData: function () {
          return $http.get(ApiUrlBuilder.build('data'));
        },
        getStudents: function (pagination) {
          return $http.get(ApiUrlBuilder.build('students'), {
            data: {
              start: pagination.start,
              count: pagination.count
            }
          });
        },
        removeStudent: function (id) {
          return $http.delete(ApiUrlBuilder.build('student/' + id));
        },
        getAssistants: function (pagination) {
          return $http.get(ApiUrlBuilder.build('assistants'), {
            data: {
              start: pagination.start,
              count: pagination.count
            }
          });
        },
        removeAssistant: function (id) {
          return $http.delete(ApiUrlBuilder.build('assistant/' + id));
        },
        getProfessors: function (pagination) {
          return $http.get(ApiUrlBuilder.build('professors'), {
            data: {
              start: pagination.start,
              count: pagination.count
            }
          });
        },
        removeProfessor: function (id) {
          return $http.delete(ApiUrlBuilder.build('professor/' + id));
        },
        issueRegisterTokens: function (emails) {
          return $http.post(ApiUrlBuilder.build('register'), {
            emails: emails
          });
        },
        changeUserPassword: function (userId, password) {
          return $http.post(ApiUrlBuilder.build('user') + '/' + userId, {
            password: password.password,
            password_confirmation: password.confirmation
          });
        },
        sendFeedback: function (content) {
          return $http.post(ApiUrlBuilder.build('feedback'), {
            text: content
          });
        },
        getGlobalEvents: function (pagination) {
          return $http.get(ApiUrlBuilder.build('globalEvents'), {
            data: {
              start: pagination.start,
              end: pagination.end
            }
          });
        },
        getGroupEvents: function (pagination) {
          return $http.get(ApiUrlBuilder.build('groupEvents'), {
            data: {
              start: pagination.start,
              end: pagination.end
            }
          });
        },
        getCourseEvents: function (pagination) {
          return $http.get(ApiUrlBuilder.build('courseEvents'), {
            data: {
              start: pagination.start,
              end: pagination.end
            }
          });
        },
        getGlobalEvent: function (id) {
          return $http.get(ApiUrlBuilder.build('globalEvent/' + id));
        },
        getGroupEvent: function (id) {
          return $http.get(ApiUrlBuilder.build('groupEvent/' + id));
        },
        getCourseEvent: function (id) {
          return $http.get(ApiUrlBuilder.build('courseEvent/' + id));
        },
        removeEvent: function (id) {
          return $http.delete(ApiUrlBuilder.build('event/' + id));
        },
        getCourses: function () {
          return $http.get(ApiUrlBuilder.build('courses'));
        },
        getGroups: function () {
          return $http.get(ApiUrlBuilder.build('groups'));
        },
        getEvent: function (id) {
          return $http.get(ApiUrlBuilder.build('event/' + id));
        },
        makeNewGlobalEvent: function (event) {
          return $http.post(ApiUrlBuilder.build('globalEvent'), {
            type: event.type,
            description: event.description,
            startsAt: event.startsAt,
            endsAt: event.endsAt
          });
        },
        saveGlobalEvent: function (event) {
          return $http.put(ApiUrlBuilder.build('globalEvent/' + event.id), {
            type: event.type,
            description: event.description,
            startsAt: event.startsAt,
            endsAt: event.endsAt
          });
        },
        makeNewGroupEvent: function (event) {
          return $http.post(ApiUrlBuilder.build('groupEvent'), {
            groupId: event.relatedEntity,
            type: event.type,
            description: event.description,
            startsAt: event.startsAt,
            endsAt: event.endsAt
          });
        },
        saveGroupEvent: function (event) {
          return $http.put(ApiUrlBuilder.build('globalEvent/' + event.id), {
            groupId: event.group.id,
            type: event.type,
            description: event.description,
            startsAt: event.startsAt,
            endsAt: event.endsAt
          });
        },
        makeNewCourseEvent: function (event) {
          return $http.post(ApiUrlBuilder.build('courseEvent'), {
            courseId: event.relatedEntity,
            type: event.type,
            description: event.description,
            startsAt: event.startsAt,
            endsAt: event.endsAt
          });
        },
        saveCourseEvent: function (event) {
          return $http.put(ApiUrlBuilder.build('courseEvent/' + event.id), {
            courseId: event.course.id,
            type: event.type,
            description: event.description,
            startsAt: event.startsAt,
            endsAt: event.endsAt
          });
        },
        getEventNotifications: function (pagination) {
          return $http.get(ApiUrlBuilder.build('eventNotifications'), {
            data: {
              start: pagination.start,
              end: pagination.end
            }
          });
        },
        getEventNotificationsForEvent: function (eventId, pagination) {
          return $http.get(ApiUrlBuilder.build('notificationsForEvent/' + eventId), {
            data: {
              start: pagination.start,
              end: pagination.end
            }
          });
        },
        getLectureNotifications: function (pagination) {
          return $http.get(ApiUrlBuilder.build('lectureNotifications'), {
            data: {
              start: pagination.start,
              end: pagination.end
            }
          });
        },
        getLectureNotificationsForLecture: function (lectureId, pagination) {
          return $http.get(ApiUrlBuilder.build('notificationsForLecture/' + lectureId), {
            data: {
              start: pagination.start,
              end: pagination.end
            }
          });
        },
        getEventNotification: function (id) {
          return $http.get(ApiUrlBuilder.build('eventNotification/' + id));
        },
        getLectureNotification: function (id) {
          return $http.get(ApiUrlBuilder.build('lectureNotification/' + id));
        },
        makeNewEventNotification: function (notification) {
          return $http.post(ApiUrlBuilder.build('eventNotification'), {
            eventId: notification.event.id,
            type: notification.type,
            description: notification.description,
            expiresAt: notification.expiresAt
          });
        },
        saveEventNotification: function (notification) {
          return $http.put(ApiUrlBuilder.build('eventNotification/' + notification.id), {
            eventId: notification.event.id,
            description: notification.description,
            expiresAt: notification.expiresAt
          });
        },
        getLectures: function (pagination) {
          return $http.get(ApiUrlBuilder.build('lectures'));
        },
        removeLecture: function (id) {
          return $http.delete(ApiUrlBuilder.build('lecture/' + id));
        },
        makeNewLecture: function (lecture) {
          return $http.post(ApiUrlBuilder.build('lecture'), {
            courseId: lecture.course.id,
            classroomId: lecture.classroom.id,
            teacherId: lecture.teacher.id,
            type: lecture.type,
            startsAt: lecture.startsAt,
            endsAt: lecture.endsAt
          });
        },
        saveLecture: function (lecture) {
          return $http.put(ApiUrlBuilder.build('lecture/' + lecture.id), {
            courseId: lecture.course.id,
            classroomId: lecture.classroom.id,
            teacherId: lecture.teacher.id,
            type: lecture.type,
            startsAt: lecture.startsAt,
            endsAt: lecture.endsAt
          });
        },
        getLecture: function (id) {
          return $http.get(ApiUrlBuilder.build('lecture/' + id));
        },
        getClassrooms: function () {
          return $http.get(ApiUrlBuilder.build('classrooms'));
        },
        removeNotification: function (id) {
          return $http.delete(ApiUrlBuilder.build('notification/' + id));
        }
      };
    }]);