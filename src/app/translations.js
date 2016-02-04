'use strict';

angular.module('siApp')
  .config(['$translateProvider', function ($translateProvider) {

    $translateProvider.translations('sr-lat', {
      'OVERVIEW': 'Pregled',
      'PROFILE': 'Profil',
      'EVENTS': 'Dogadjaji',
      'NOTIFICATIONS': 'Obavestenja',
      'STUDENTS': 'Studenti',
      'PROFESSORS': 'Profesori',
      'ASSISTANTS': 'Asistenti',
      'LOGOUT': 'Kraj rada'
    });

    $translateProvider.preferredLanguage('sr-lat');
  }]);