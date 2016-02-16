'use strict';

angular.module('siApp')
  .config(['$translateProvider', function ($translateProvider) {

    $translateProvider.translations('sr-lat', {
      'FACULTY_NAME': 'Računarski fakultet',
      'APP_NAME': 'Student info',
      'OVERVIEW': 'Pregled',
      'PROFILE': 'Profil',
      'EVENTS': 'Dogadjaji',
      'NOTIFICATIONS': 'Obaveštenja',
      'STUDENTS': 'Studenti',
      'PROFESSORS': 'Profesori',
      'ASSISTANTS': 'Asistenti',
      'GROUPS': 'Grupe', 
      'GROUP': 'Grupa',
      'CLASSROOMS': 'Učionice',
      'TEACHERS': 'Predavači',
      'LOGOUT': 'Kraj rada', 
      'LOGIN.WELCOME': 'Dobrodošli na Student info',
      'LOGIN.EMAIL': 'Vaša adresa',
      'LOGIN.ERROR.INVALID_INPUT': 'Nepotpuno uneti podaci',
      'LOGIN.SIGNIN': 'Prijavite se',
      'LOGIN.ERROR.INVALID_CREDENTIALS': 'Netačnan e-mail ili lozinka',
      'LOGIN.PASSWORD': "Vaša lozinka", 
      'REGISTER.WELCOME': "Dobrodošli na Student info", 
      'REGISTER.EMAIL': "Vaša adresa", 
      'REGISTER.PASSWORD': "Unesite lozinku",
      'REGISTER.PASSWORD_CONFIRM': "Ponovite lozinku",
      'REGISTER.SIGNUP': "Prijavite se",
      'TIMETABLE': "Raspored časova", 
      'CALENDAR': "Kalendar aktivnosti",
      'FEEDBACK': 'Povratne informacije',
      'GODINE_1': 'Prva godina',
      'GODINE_2': 'Druga godina',
      'GODINE_3': 'Treća godina',
      'GODINE_4': 'Četvrta godina',
      'GODINE_0': 'Ostalo',
      'SPRATOVI_6': 'Šesti sprat',
      'DAY_1': 'Ponedeljak',
      'DAY_2': 'Utorak',
      'DAY_3': 'Sreda',
      'DAY_4': 'Četvrtak',
      'DAY_5': 'Petak',
      'DAY_6': 'Subota',
      'DAY_7': 'Nedelja',
      'GLOBAL_EVENTS': 'Opšti dogadjaji',
      'COURSE_EVENTS': 'Dogadjaji za kurs',
      'GROUP_EVENTS': 'Dogadjaji za grupu',
      'LECTURES': 'Predavanja i vežbe',
      'COURSES': 'Kursevi'
    });

    $translateProvider.preferredLanguage('sr-lat');
  }]);