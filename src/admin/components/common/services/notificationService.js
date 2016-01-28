'use strict';

angular.module('siAdminApp')
  .factory('NotificationService', ['API', '$resource', function (API, $resource) {

    var lectureNotifications = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/lectureNotifications/:start/:count'
      },
      update: {
        method: 'PUT'
      }
    };

    var eventNotifications = {
      getAll: {
        method: 'GET',
        params: {
          start: 0,
          count: 25
        },
        url: API.url + '/eventNotifications/:start/:count'
      },
      update: {
        method: 'PUT'
      },
      getAllForEvent: {
        method: 'GET',
        params: {
          eventId: 0
        },
        url: API.url + '/notificationsForEvent/:eventId'
      }
    };

    return {
      types: [
        {
          id: 0,
          name: "Notifikacija - Predavanje"
        },
        {
          id: 1,
          name: "Notifikacija - Dogadjaj"
        }
      ],
      lectureNotification: $resource(API.url + '/lectureNotification/:id', {}, lectureNotifications),
      eventNotification: $resource(API.url + '/eventNotification/:id', {}, eventNotifications)
    };
  }]);

