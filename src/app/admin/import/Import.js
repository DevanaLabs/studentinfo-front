'use strict';

angular.module('siApp')
  .factory('Import', ['ApiUrlBuilder', 'Upload',
    function (ApiUrlBuilder, Upload) {
      var importService = {};

      importService.supportedTypes = [
        {
          slug: 'lectures',
          name: 'LECTURES',
          url: 'importLecture'
        },
        {
          slug: 'professors',
          name: 'PROFESSORS',
          url: 'importProfessors'
        },
        {
          slug: 'students',
          name: 'STUDENTS',
          url: 'importStudents'
        },
        {
          slug: 'classrooms',
          name: 'CLASSROOMS',
          url: 'importClassrooms'
        },
        {
          slug: 'courses',
          name: 'COURSES',
          url: 'importCourses'
        },
        {
          slug: 'assistants',
          name: 'ASSISTANTS',
          url: 'importAssistants'
        }
      ];

      importService.uploadFile = function (type, file) {
        return Upload.upload({
          url: ApiUrlBuilder.build(type.url),
          data: {'import': file}
        });
      };

      return importService;
    }]);