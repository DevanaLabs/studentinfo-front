'use strict';

angular.module('siApp')
  .config(['$translateProvider', function ($translateProvider) {

    $translateProvider.translations('sr-lat', {
      'FACULTY_NAME': "Računarski fakultet",
      'APP_NAME': "Student info",
      'OVERVIEW': 'Pregled',
      'PROFILE': 'Profil',
      'EVENTS': 'Dogadjaji',
      'NOTIFICATIONS': 'Obavestenja',
      'STUDENTS': 'Studenti',
      'PROFESSORS': 'Profesori',
      'ASSISTANTS': 'Asistenti',
      'LOGOUT': 'Kraj rada', 
      'LOGIN.WELCOME': "Dobrodošli na Student info", 
      'LOGIN.EMAIL': "Vaša adresa", 
      'LOGIN.ERROR.INVALID_INPUT': 'Nepotpuno uneti podaci',
      'LOGIN.SIGNIN': "Prijavite se", 
      'LOGIN.ERROR.INVALID_CREDENTIALS': 'Netačnan e-mail ili lozinka',
      'LOGIN.PASSWORD': "Vaša lozinka", 
      'REGISTER.WELCOME': "Dobrodošli na Student info", 
      'REGISTER.EMAIL': "Vaša adresa", 
      'REGISTER.PASSWORD': "Unesite lozinku",
      'REGISTER.PASSWORD_CONFIRM': "Ponovite lozinku",
      'REGISTER.SIGNUP': "Prijavite se",
      'TIMETABLE': "Raspored časova", 
      'CALENDAR': "Kalendar aktivnosti"
    });

    $translateProvider.preferredLanguage('sr-lat');
  }]);