'use strict';

angular.module('siApp.dashboard')
  .directive('siDashboardSidebar', [function () {
    return {
      scope: '',
      replace: true,
      controller: ['$scope', '$timeout', 'BACKGROUNDS', function($scope, $timeout, BACKGROUNDS){
              function nextImg () {
                var num = Math.floor((moment().valueOf()) / 86400000 % BACKGROUNDS.length);

                //var num = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
                angular.element('body').css('background-image', "url('assets/img/bgs/" + BACKGROUNDS[num] + "')");
                angular.element('#sidebar-blur-background').css('background-image', "url('assets/img/bgs/" + BACKGROUNDS[num] + "')");
                $timeout(function () {
                  nextImg();
                }, 1000 * 60 * 60 * 1);
              }

              function tick () {
                $scope.currentTime = moment().format('HH:mm - D. MMMM, dddd');
                $timeout(function () {
                  tick();
                }, 1000);
              }
              tick();

              nextImg();
            }], 
      templateUrl: 'dashboard/sidebar/si-dashboard-sidebar.html'
    };
  }]);