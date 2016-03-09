'use strict';

angular.module('siApp')
  .config(['$translateProvider', function ($translateProvider) {

    $translateProvider.translations('sr-cyr', {
      'FACULTY_NAME': 'Рачунарски факултет',
      'APP_NAME': 'Студент инфо',
      'OVERVIEW': 'Преглед',
      'PROFILE': 'Профил',
      'EVENTS': 'Догађаји',
      'NOTIFICATIONS': 'Обавештења',
      'STUDENTS': 'Студенти',
      'PROFESSORS': 'Професори',
      'ASSISTANTS': 'Асистенти',
      'GROUPS': 'Групе', 
      'GROUP': 'Група',
      'CLASSROOMS': 'Учионице',
      'TEACHERS': 'Предавачи',
      'LOGOUT': 'Крај рада', 
      'LOGIN.WELCOME': 'Добродошли на Студент инфо',
      'LOGIN.EMAIL': 'Ваша адреса',
      'LOGIN.ERROR.INVALID_INPUT': 'Непотпуно унети подаци',
      'LOGIN.SIGNIN': 'Пријавите се',
      'LOGIN.ERROR.INVALID_CREDENTIALS': 'Нетачна адреса или лозинка',
      'LOGIN.PASSWORD': "Ваша лозинка", 
      'REGISTER.WELCOME': "Добродошли на Студент инфо", 
      'REGISTER.EMAIL': "Ваша адреса", 
      'REGISTER.PASSWORD': "Унесите лозинку",
      'REGISTER.PASSWORD_CONFIRM': "Поновите лозинку",
      'REGISTER.SIGNUP': "Приајвите се",
      'TIMETABLE': "Распоред часова", 
      'CALENDAR': "Календар активности",
      'FEEDBACK': 'Повратне информације',
      'GODINE_1': 'Прва година',
      'GODINE_2': 'Друга година',
      'GODINE_3': 'Трећа година',
      'GODINE_4': 'Четврта година',
      'GODINE_0': 'Остало',
      'SPRATOVI_6': 'Шести спрат',
      'DAY_1': 'Понедељак',
      'DAY_2': 'Уторак',
      'DAY_3': 'Среда',
      'DAY_4': 'Четвртак',
      'DAY_5': 'Петак',
      'DAY_6': 'Субота',
      'DAY_7': 'Недеља',
      'GLOBAL_EVENTS': 'Општи догађаји',
      'COURSE_EVENTS': 'Догађаји за курс',
      'GROUP_EVENTS': 'Догађаји за групу',
      'LECTURES': 'Предавања и вежбе',
      'COURSES': 'Курсеви',
      'IMPORT': 'Увоз',
      'EXERCISES': 'Вежбе',
      'DISCOURSE': 'Предавање', 
      'DISCOURSE_AND_EXERCISES': 'Предавање и вежбе', 
      'PRACTICUM': 'Практикум', 
      'NO_EVENTS_FOR_DAY': 'Нема дешавања на овај дан.',
      'SEND_FEEDBACK': 'Пошаљите нам сугестије и предлоге',
      'THANKYOU': 'Хвала!',
      'CHANGES_SAVED': 'Промене су сачуване!',
      'INVALID_INPUT_DATA': 'Унесени подаци нису валидни',
      'THANKS_FOR_FEEDBACK': 'Хвала на повратним информацијама',
      'DATA_IMPORT_SUCCESS': 'Успешно импортовани подаци',
      'UNDEFINED_ERROR': 'Непозната грешка',
      'REGISTER_TOKENS_ISSUED': 'Регистрациони токени су издати',
      'SUCCESS': 'Успех',
      'ERROR': 'Грешка',
      'DATA_FETCH_ERROR': 'Грешка при дохватању података',
      'ACCESS_DENIED': 'Сервер је одбио приступ',
      'FIRST_NAME': 'Име',
      'LAST_NAME': 'Презиме',
      'EMAIL': 'Е пошта',
      'YEAR': 'Година',
      'INDEX_NUMBER': 'Број индекса',
      'SAVE': 'Сачувај',
      'CANCEL': 'Одустани',
      'GOODBYE': 'Довиђења',
      'EVENT': 'Догађај',
      'NOTIFICATION': 'Обавештење',
      'FIRST_AND_LAST_NAME': 'Име и презиме',
      'EDIT': 'Измени',
      'DELETE': 'Обриши',
      'NO_DATA': 'Нема података',
      'REGISTER_TOKEN_EXPIRED': 'Регистрациони токен је истекао',
      'REGISTER_TOKEN_ACTIVE': 'Регистрациони токен је активан',
      'START': 'Почетак',
      'END': 'Крај',
      'DESCRIPTION': 'Опис',
      'TYPE': 'Тип',
      'NEW_EVENT': 'Нови догађај',
      'FEEDBACK_DESCRIPTION': 'Шта желите да нам кажете?',
      'SEND': 'Пошаљи',
      'IMPORT_DATA': 'Импорт података',
      'DATA_TYPE': 'Тип података',
      'CLICK_TO_CHOOSE_FILE': 'Кликни за избор фајла',
      'DAY': 'Дан',
      'START_TIME': 'Време почетка',
      'END_TIME': 'Време краја',
      'NEW_LECTURE': 'Ново предавање/вежба',
      'EXPIRATION_DATE': 'Датум истека',
      'PASSWORD_CHANGE': 'Промена лозинке',
      'NEW_PASSWORD': 'Нова лозинка',
      'NEW_PASSWORD_CONFIRMATION': 'Потврда нове лозинке',
      'TITLE': 'Титула',
      'PREV': 'Претходна',
      'NEXT': 'Следећа',
      'ISSUE_REGISTER_TOKENS': 'Издај регистрационе токене',
      'SEARCH': 'Претрага',
      'ADD_NEW_STUDENT': 'Додај новог студента',
      'ADD_NEW_ASSISTANT': 'Додај новог асистента',
      'ADD_NEW_PROFESSOR': 'Додај новог професора',
      'NEW_USER': 'Нови корисник'
    });





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
      'COURSES': 'Kursevi',
      'IMPORT': 'Import',
      'EXERCISES': 'Vežbe',
      'DISCOURSE': 'Predavanje', 
      'NO_EVENTS_FOR_DAY': 'Nema dešavanja na ovaj dan.',
      'SEND_FEEDBACK': 'Pošaljite nam sugestije i predloge',  
      'THANKYOU': 'Hvala!'
    });

    $translateProvider.preferredLanguage('sr-cyr');
  }]);