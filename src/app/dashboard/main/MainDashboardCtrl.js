'use strict';

angular.module('siApp.dashboard')
  .controller('MainDashboardCtrl', ['$rootScope', '$scope', 'Dashboard', 'EVENTS', '$state', '$http', 
    '$timeout', 'ScreensaverTimer', 'BACKGROUNDS', '$location', '$window', 'toastr', '$translate', 'localStorageService', '$interval', 'Api',
    function ($rootScope, $scope, Dashboard, EVENTS, $state, $http, 
      $timeout, ScreensaverTimer, BACKGROUNDS, $location, $window, toastr, $translate, localStorageService, $interval, Api) {


      var interval = 3 * 1000;
      $interval(function () {
        Api.pingHome();
      }, interval);

      $rootScope.$on(EVENTS.API.REFRESH_START, function () {
        //console.log('Dashboard refresh start');
        if (!(localStorageService.get('dashboard-data'))) {
          $scope.showLoader = true;
        }
      });

      $rootScope.$on(EVENTS.API.REFRESH_SUCCESS, function () {
        //console.log('Dashboard refresh success');
        if($scope.showLoader) {
          console.log($state.current);
          $state.reload();
        }
        $scope.showLoader = false;
      });

      $rootScope.$on(EVENTS.API.REFRESH_ERROR, function (errorEvent, response) {
        $scope.showLoader = false;
        //console.log(response);
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


      $scope.currentState = function() { return $state.current.name.substr(10); }

      $scope.userSlug = localStorageService.get('auth').user.faculty.slug;


      //$rootScope.$on('$stateChangeStart',
      //function(event, toState, toParams, fromState, fromParams, options){
      //  if(fromState.name === 'dashboard.screensaver') {
      //    return;
      //  }
      //  var change = {
      //    time: moment().format(),
      //    from: {
      //      name: fromState.name,
      //      params: fromParams
      //    },
      //    to: {
      //      name: toState.name,
      //      params: toParams
      //    }
      //  }
      //  console.log(JSON.stringify(change));
      //});
    }]);