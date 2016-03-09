'use strict';

angular.module('siApp.dashboard')
  .controller('MainDashboardCtrl', ['$rootScope', '$scope', 'Dashboard', 'EVENTS', '$state', '$http', 
    '$timeout', 'ScreensaverTimer', 'BACKGROUNDS', '$location', '$window', 'toastr', '$translate',
    function ($rootScope, $scope, Dashboard, EVENTS, $state, $http, 
      $timeout, ScreensaverTimer, BACKGROUNDS, $location, $window, toastr, $translate) {

      // $rootScope.$on(EVENTS.API.REFRESH_START, function () {
      //   console.log('Dashboard refresh start');
      // });

      // $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
      //   console.log('Dashboard refresh success');
      // });

      $rootScope.$on(EVENTS.API.REFRESH_ERROR, function (errorEvent, response) {
        console.log(response);
        toastr.error($translate.instant(response.data.error.toUpperCase()) + " (" + response.status + ")", $translate.instant('DATA_FETCH_ERROR'));
      });

      $scope.state = function (state) {
        return $state.is(state);
      };

      Dashboard.initialLoad();

      $scope.baseClick = function () {
        ScreensaverTimer.resetTimer();
        //console.log('This should reset the timer');
      };

      function getRevision () {
        $http({
          method: 'GET',
          url: '/revision.txt'
        }).then(function successCallback (response) {
          console.log(response.data);
          if (currentRevision === "") {
            currentRevision = response.data;
          }
          else if (currentRevision != response.data) {
            localStorage.clear();
            $location.url("");
            $window.location.reload();
          }
        });
        $timeout(function () {
          getRevision();
        }, 5 * 60 * 1000);
      }

      var currentRevision = "";
      //getRevision();

      document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      });


    }]);