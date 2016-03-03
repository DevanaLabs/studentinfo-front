'use strict';

angular.module('siApp')
  .factory('Feedback', ['Api',
    function (Api) {
      var feedback = {};

      feedback.sendAdminPanelFeedback = function (content) {
        content = 'Admin : ' + content + ' ' + moment().format('HH:mm:ss, DD/MM/YYYY');
        return Api.sendFeedback(content);
      };

      feedback.sendDashboardFeedback = function (content) {
        content = 'Dashboard : ' + content + ' ' + moment().format('HH:mm:ss, DD/MM/YYYY');
        return Api.sendFeedback(content);
      };

      return feedback;
    }]);