'use strict';

angular.module('siApp')
  .constant('SERVER_ERRORS', {
    "105": "COURSE_NOT_IN_DB",
    "115": "COURSE_ALREADY_EXISTS",
    "133": "COURSE_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "104": "PROFESSOR_NOT_IN_DB",
    "139": "PROFESSOR_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "128": "TEACHER_NOT_IN_DB",
    "140": "TEACHER_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "120": "FACULTY_NOT_IN_DB",
    "121": "FACULTY_ALREADY_EXISTS",
    "123": "NOTIFICATION_NOT_IN_DB",
    "138": "NOTIFICATION_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "111": "EVENT_NOT_IN_DB",
    "134": "EVENT_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "106": "CLASSROOM_NOT_IN_DB",
    "114": "CLASSROOM_ALREADY_EXISTS",
    "132": "CLASSROOM_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "108": "GROUP_NOT_IN_DB",
    "116": "GROUP_ALREADY_EXISTS",
    "136": "GROUP_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "129": "FEEDBACK_NOT_IN_DB",
    "135": "FEEDBACK_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "126": "ASSISTANT_NOT_IN_DB",
    "131": "ASSISTANT_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "109": "YOU_ARE_NOT_A_STUDENT",
    "113": "STUDENT_NOT_UNIQUE_INDEX",
    "117": "STUDENT_NOT_IN_DB",
    "130": "STUDENT_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "107": "LECTURE_NOT_IN_DB",
    "137": "LECTURE_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "143": "DEVICE_TOKEN_DOES_NOT_EXIST",
    "119": "ADMIN_NOT_IN_DB",
    "100": "ACCESS_DENIED",
    "101": "INVALID_REGISTER_TOKEN",
    "102": "EXPIRED_REGISTER_TOKEN",
    "103": "USER_DOES_NOT_EXIST",
    "110": "INCORRECT_TIME",
    "112": "NOT_UNIQUE_EMAIL",
    "118": "CSV_FILE_NOT_FOUND",
    "122": "USER_BELONGS_TO_THIS_FACULTY",
    "127": "USER_DOES_NOT_BELONG_TO_THIS_FACULTY",
    "141": "YOU_NEED_TO_REGISTER_FIRST",
    "142": "YOU_DO_N0T_HAVE_PERMISSION_TO_SEE_THIS",
  })