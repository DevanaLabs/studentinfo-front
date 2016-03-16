'use strict';

angular.module("siApp.dashboard")
  .service('ScreensaverTimer', ['$timeout', '$state', function ($timeout, $state) {
    //console.log("Timer loaded");
    var timer;
    // time before screensaver kicks in is set in global config as 5

    var startTimer = function () {
      timer = $timeout(function () {
        $state.go('dashboard.screensaver');
        //console.log("Timer fired!");
      }, 5 * 60 * 1000);
    };

    var resetTimer = function () {
      $timeout.cancel(timer);
      //console.log("Timer reset!");
      startTimer();
    };

    startTimer();

    return {
      timer: timer,
      resetTimer: resetTimer
    };
  }]);