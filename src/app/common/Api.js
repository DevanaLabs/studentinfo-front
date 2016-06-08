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
        registerGet: function (token) {
          return $http.get(ApiUrlBuilder.build('register/' + token));
        },
        registerPost: function (token, password) {
          return $http.post(ApiUrlBuilder.build('register/' + token), password);
        },
        recoverPost: function (token, password) {
          return $http.post(ApiUrlBuilder.build('register/recoverPasswordConfirmation/' + token), password);
        },
        fetchDashboardData: function (semester) {
          return $http.get(ApiUrlBuilder.build('data'), {
            data: {
              // semester: semester, 
              // year: moment().year()
            }
          });
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
        getSettings: function() {
          return $http.get(ApiUrlBuilder.build('settings'));
        },
        setSettings: function (semester, year) {
          return $http.post(ApiUrlBuilder.build('settings'), {
            semester: semester,
            year: year
          })
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
        makeNewCourse: function (course) {
          return $http.post(ApiUrlBuilder.build('course'), {
            name: course.name,
            espb: course.espb,
            code: course.code,
            semester: course.semester
          });
        },
        saveCourse: function (course) {
          return $http.put(ApiUrlBuilder.build('course/' + course.id), {
            name: course.name,
            espb: course.espb,
            code: course.code,
            semester: course.semester
          });
        },
        getCourse: function (id) {
          return $http.get(ApiUrlBuilder.build('course/'+ id));
        },
        getCourses: function () {
          return $http.get(ApiUrlBuilder.build('courses'));
        },
        removeCourse: function (id) {
          return $http.delete(ApiUrlBuilder.build('course/' + id));
        },
        makeNewGroup: function (group) {
          return $http.post(ApiUrlBuilder.build('group'), {
            name: group.name,
            year: group.year
          });
        },
        saveGroup: function (group) {
          return $http.put(ApiUrlBuilder.build('group/' + group.id), {
            name: group.name,
            year: group.year
          });
        },
        getGroup: function (id) {
          return $http.get(ApiUrlBuilder.build('group/'+ id));
        },
        getGroups: function () {
          return $http.get(ApiUrlBuilder.build('groups'));
        },
        removeGroup: function (id) {
          return $http.delete(ApiUrlBuilder.build('group/' + id));
        },
        makeNewClassroom: function (classroom) {
          console.log('a');
          console.log(classroom);
          return $http.post(ApiUrlBuilder.build('classroom'), {
            name: classroom.name,
            floor: classroom.floor,
            directions: classroom.directions
          });
        },
        saveClassroom: function (classroom) {
          console.log('b');
          console.log(classroom);
          return $http.put(ApiUrlBuilder.build('classroom/' + classroom.id), {
            name: classroom.name,
            floor: classroom.floor,
            directions: classroom.directions
          });
        },
        getClassrooms: function () {
          return $http.get(ApiUrlBuilder.build('classrooms'));
        },
        getClassroom: function (id) {
          return $http.get(ApiUrlBuilder.build('classroom/'+ id));
        },
        removeClassroom: function (id) {
          return $http.delete(ApiUrlBuilder.build('classroom/' + id));
        },
        getEvent: function (id) {
          return $http.get(ApiUrlBuilder.build('event/' + id));
        },
        makeNewGlobalEvent: function (event) {
          return $http.post(ApiUrlBuilder.build('globalEvent'), {
            type: event.type,
            description: event.description,
            startsAt: event.startsAtOutgoing,
            endsAt: event.endsAtOutgoing
          });
        },
        saveGlobalEvent: function (event) {
          return $http.put(ApiUrlBuilder.build('globalEvent/' + event.id), {
            type: event.type,
            description: event.description,
            startsAt: event.startsAtOutgoing,
            endsAt: event.endsAtOutgoing
          });
        },
        makeNewGroupEvent: function (event) {
          return $http.post(ApiUrlBuilder.build('groupEvent'), {
            groupId: event.relatedEntity,
            type: event.type,
            classrooms: event.classrooms,
            description: event.description,
            startsAt: event.startsAtOutgoing,
            endsAt: event.endsAtOutgoing
          });
        },
        saveGroupEvent: function (event) {
          return $http.put(ApiUrlBuilder.build('globalEvent/' + event.id), {
            groupId: event.group.id,
            type: event.type,
            classrooms: event.classrooms,
            description: event.description,
            startsAt: event.startsAtOutgoing,
            endsAt: event.endsAtOutgoing
          });
        },
        makeNewCourseEvent: function (event) {
          return $http.post(ApiUrlBuilder.build('courseEvent'), {
            courseId: event.relatedEntity,
            type: event.type,
            classrooms: event.classrooms,
            description: event.description,
            startsAt: event.startsAtOutgoing,
            endsAt: event.endsAtOutgoing
          });
        },
        saveCourseEvent: function (event) {
          return $http.put(ApiUrlBuilder.build('courseEvent/' + event.id), {
            courseId: event.course.id,
            type: event.type,
            classrooms: event.classrooms,
            description: event.description,
            startsAt: event.startsAtOutgoing,
            endsAt: event.endsAtOutgoing
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
            endsAt: lecture.endsAt,
            year: lecture.year
          });
        },
        saveLecture: function (lecture) {
          return $http.put(ApiUrlBuilder.build('lecture/' + lecture.id), {
            courseId: lecture.course.id,
            classroomId: lecture.classroom.id,
            teacherId: lecture.teacher.id,
            type: lecture.type,
            startsAt: lecture.startsAt,
            endsAt: lecture.endsAt,
            year: lecture.year
          });
        },
        getLecture: function (id) {
          return $http.get(ApiUrlBuilder.build('lecture/' + id));
        },
        removeNotification: function (id) {
          return $http.delete(ApiUrlBuilder.build('notification/' + id));
        },
        makeNewLectureNotification: function (notification) {
          return $http.post(ApiUrlBuilder.build('lectureNotification'), {
            lectureId: notification.lecture.id,
            type: notification.type,
            description: notification.description,
            expiresAt: notification.expiresAt
          });
        },
        saveLectureNotification: function (notification) {
          return $http.put(ApiUrlBuilder.build('lectureNotification/' + notification.id), {
            lectureId: notification.lecture.id,
            description: notification.description,
            expiresAt: notification.expiresAt
          });
        },
        makeNewStudent: function (student) {
          return $http.post(ApiUrlBuilder.build('student'), {
            firstName: student.firstName,
            lastName: student.lastName,
            indexNumber: student.indexNumber,
            email: student.email,
            lectures: student.lectures,
            courses: student.courses,
            year: student.year
          });
        },
        saveStudent: function (student) {
          return $http.put(ApiUrlBuilder.build('student/' + student.id), {
            firstName: student.firstName,
            lastName: student.lastName,
            indexNumber: student.indexNumber,
            email: student.email,
            year: student.year
          });
        },
        getStudent: function (id) {
          return $http.get(ApiUrlBuilder.build('student/' + id));
        },
        makeNewAssistant: function (assistant) {
          return $http.post(ApiUrlBuilder.build('assistant'), {
            firstName: assistant.firstName,
            lastName: assistant.lastName,
            title: assistant.title,
            email: assistant.email
          });
        },
        saveAssistant: function (assistant) {
          return $http.put(ApiUrlBuilder.build('assistant/' + assistant.id), {
            firstName: assistant.firstName,
            lastName: assistant.lastName,
            title: assistant.title,
            email: assistant.email,
          });
        },
        getAssistant: function (id) {
          return $http.get(ApiUrlBuilder.build('assistant/' + id));
        },
        makeNewProfessor: function (professor) {
          return $http.post(ApiUrlBuilder.build('professor'), {
            firstName: professor.firstName,
            lastName: professor.lastName,
            title: professor.title,
            email: professor.email
          });
        },
        saveProfessor: function (professor) {
          return $http.put(ApiUrlBuilder.build('professor/' + professor.id), {
            firstName: professor.firstName,
            lastName: professor.lastName,
            title: professor.title,
            email: professor.email,
          });
        },
        getProfessor: function (id) {
          return $http.get(ApiUrlBuilder.build('professor/' + id));
        },
        pingHome: function(){
          return $http.get(ApiUrlBuilder.build('ping/'));
        }
      };
    }]);