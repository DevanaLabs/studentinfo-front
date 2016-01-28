'use strict';

angular.module("siApp")
  .service('ScreensaverTimer', ['$timeout', 'SCREENSAVER_TIME', '$state', function ($timeout, SCREENSAVER_TIME, $state) {
    //console.log("Timer loaded");
    var timer;
    // time before screensaver kicks in is set in global config as SCREENSAVER_TIME

    var startTimer = function () {
      timer = $timeout(function () {
        $state.go('root');
        //console.log("Timer fired!");
      }, SCREENSAVER_TIME * 60 * 1000);
    };

    var resetTimer = function () {
      $timeout.cancel(timer);
      //console.log("Timer reset!");
      timer = $timeout(function () {
        startTimer();
      }, SCREENSAVER_TIME * 60 * 1000);
    };

    startTimer();

    return {
      timer: timer,
      resetTimer: resetTimer
    }
  }]);